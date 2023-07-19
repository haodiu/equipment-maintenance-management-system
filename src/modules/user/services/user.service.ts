import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { isUndefined } from 'lodash';
import type { FindOptionsWhere } from 'typeorm';

import { generateHash } from '../../../common/utils';
import { MAP_OBD_STAGE, OBD_STAGE } from '../../../constants';
import {
  FileNotFoundException,
  ForbiddenResourceException,
  ServiceUnavailableException,
  SubmitObdDraftException,
  UserDraftNotFoundException,
  UserNotFoundException,
  UserRegisterConflictException,
} from '../../../exceptions';
import { ImageService } from '../../../shared/services/image.service';
import { SenteService } from '../../../shared/services/sente.service';
import { ObdStageService } from '../../onboarding_stage/services/obd-stage.service';
import { AliasesDto } from '../domains/dtos/aliases.dto';
import { ProfileCardDto } from '../domains/dtos/profile-card.dto';
import type { UserAvatarDto } from '../domains/dtos/user-avatar.dto';
import type {
  SenteUserChangePasswordDto,
  UserChangePasswordDto,
} from '../domains/dtos/user-change-password.dto';
import { UserGeneralProfileDto } from '../domains/dtos/user-general-profile.dto';
import type { UserInStageDto } from '../domains/dtos/user-in-stage.dto';
import type { UserObdFormDto } from '../domains/dtos/user-obd-form.dto';
import { UserProfileDetailDto } from '../domains/dtos/user-profile-detail.dto';
import type { UserQueryDto } from '../domains/dtos/user-query.dto';
import type { UserRegisterDto } from '../domains/dtos/user-register.dto';
import type { UserSubmitObdFormOptionsDto } from '../domains/dtos/user-submit-ob-form-options.dto';
import type { UserEntity } from '../domains/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly obdStageService: ObdStageService,
    private readonly userRepository: UserRepository,
    private readonly senteService: SenteService,
    private readonly imageService: ImageService,
  ) {}

  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Find user with many options
   * @param options
   * @returns Promise<UserEntity | null>
   */
  async findByRequireInfo(
    options: Partial<{ idNo: string; email: string; alias: string }>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOneByFilter(options);
  }

  /**
   * Get user's profile details page by userId
   * @param userId
   * @returns Promise<UserProfileDetailDto>
   */
  async getUserProfileDetail(userId: number): Promise<UserProfileDetailDto> {
    const userEntity = await this.userRepository.findById(userId);

    if (!userEntity) {
      throw new UserNotFoundException('User not found');
    }

    const detailProfile = new UserProfileDetailDto(userEntity);

    const imageProperties = [
      { property: detailProfile.avatar, id: detailProfile.avatar?.id },
      {
        property: detailProfile.citizenIdFrontImg,
        id: detailProfile.citizenIdFrontImg?.id,
      },
      {
        property: detailProfile.citizenIdBackImg,
        id: detailProfile.citizenIdBackImg?.id,
      },
    ];

    const promises = imageProperties.map(async (image) => {
      if (!isUndefined(image.id) && !isUndefined(image.property)) {
        image.property.url = await this.imageService.getImageUrl(image.id);
      }
    });

    await Promise.all(promises);

    return detailProfile;
  }

  /**
   * Send users' fullName to SenteService to get available corresponded aliases
   * @param fullName - is for query to sente service to generate alias, e.g., "Nguyen Van A"
   * @returns {Promise<AliasesDto>} - is for generate list of available aliases correspond to user's fullName
   */
  async generateAliases(fullName: string): Promise<AliasesDto> {
    const aliases = await this.senteService.generateAliases(fullName);

    return new AliasesDto(aliases);
  }

  /**
   * Get user general profile page by user id
   * @param userId
   * @returns {Promise<UserGeneralProfileDto>}
   */
  async getUserGeneralProfile(userId: number): Promise<UserGeneralProfileDto> {
    const userProfile = await this.userRepository.findById(userId);

    if (!userProfile) {
      throw new UserNotFoundException('User Not Found!');
    }

    return new UserGeneralProfileDto(userProfile);
  }

  /* Register user information and send it to Sente
   * Uploads an OBD draft for a user.
   * @param {UserEntity} user - The user entity.
   * @param {UserObdFormDto} obdForm - The OBD form to upload as a draft.
   * @returns {Promise<void>} - A Promise that resolves to void when the OBD draft upload is completed.
   */
  async uploadObdDraft(
    user: UserEntity,
    obdForm: UserObdFormDto,
  ): Promise<void> {
    const saveUser: UserEntity = user;
    saveUser.userDraftInfo = JSON.stringify(obdForm);
    await this.userRepository.save(saveUser);
  }

  /**
   * Submits an OBD form for a user.
   * @param {UserObdFormDto} obdForm - The OBD form to submit.
   * @param {number} userId - The ID of the user.
   * @param {UserSubmitObdFormOptionsDto} options - The options for submitting the OBD form.
   * @param {UserEntity} user - The current user that login.
   * @returns {Promise<void>} - A Promise that resolves to void when the OBD form submission is completed.
   * @throws {UserNotFoundException} - If the user with the given ID is not found.
   * @throws {UnauthorizedException} - If the user is invalid (does not match the given user ID).
   */
  async submitObdForm(
    obdForm: UserObdFormDto,
    userId: number,
    options: UserSubmitObdFormOptionsDto,
    user: UserEntity,
  ): Promise<void> {
    const userWithId = await this.userRepository.findById(userId);

    if (!userWithId) {
      throw new UserNotFoundException('User not found');
    }

    if (user.id !== userId) {
      throw new UnauthorizedException('User invalid');
    }

    await (options.draft.toString() === 'true'
      ? this.uploadObdDraft(userWithId, obdForm)
      : this.submitObdDraft(userWithId, obdForm));
  }

  /*
   * Retrieves users with a specified stage and returns an array of profile card DTOs.
   * @param {string} stage - The stage to filter users by.
   * @param {UserQueryDto} [option] - Optional query parameters for additional filtering.
   * @returns {Promise<ProfileCardDto[]>} A promise that resolves to an array of profile card DTOs.
   */
  async getUsersWithStage(
    stageId: number,
    option?: UserQueryDto,
  ): Promise<ProfileCardDto[]> {
    const userEntities = await this.userRepository.getUsersByObdStage(
      stageId,
      option,
    );

    return userEntities.map((user) => new ProfileCardDto(user));
  }

  /**
   * Retrieves users grouped by OBD stage and returns an array of user in stage DTOs.
   * @param {UserQueryDto} [option] - Optional query parameters for additional filtering.
   * @returns {Promise<UserInStageDto[]>} A promise that resolves to an array of user in stage DTOs.
   */
  async getUsersGroupByObdStage(
    option?: UserQueryDto,
  ): Promise<UserInStageDto[]> {
    const obdStages = Object.values(OBD_STAGE);
    let result: UserInStageDto[] = [];

    result = await Promise.all(
      obdStages.map(async (stage) => {
        const stageRecord = await this.obdStageService.getObdStage(stage);
        const stateId = stageRecord.id;
        const users = await this.getUsersWithStage(stateId, option);

        return { title: MAP_OBD_STAGE[stage], users };
      }),
    );

    return result;
  }

  /**
   * Register user information and send it to Sente
   * @async
   * @method
   * @param {UserRegisterDto} userRegisterDto
   * @returns Promise<void>
   */
  async register(userRegisterDto: UserRegisterDto) {
    const { personalEmail, citizenId, alias } = userRegisterDto;

    const existsUser = await this.findByRequireInfo({
      idNo: citizenId,
      email: personalEmail,
      alias,
    });

    if (existsUser) {
      throw new UserRegisterConflictException(
        'User information are ready exists',
      );
    }

    const newUser = this.userRepository.create({
      ...userRegisterDto,
    });

    await this.userRepository.save(newUser);
  }

  /**
   * Submits the user's OBD draft form.
   * Sends the user's full name to SenteService to get available corresponding aliases.
   * @param UserObdFormDto - The user's OBD form data.
   * @throws SubmitObdDraftException if the user has submitted obd form
   */
  async submitObdDraft(
    authUser: UserEntity,
    userUploadObdFormDto: UserObdFormDto,
  ): Promise<void> {
    // Check if user has already submitted the form
    if (authUser.isSubmitObdForm) {
      throw new SubmitObdDraftException();
    }

    await this.userRepository.updateObdUserDraft(
      authUser,
      userUploadObdFormDto,
    );
  }

  /**
   * Retrieves the onboarding form for a user.
   *
   * @param {number} userId - The user ID.
   * @param {UserEntity} authUser - The user entity.
   * @returns {Promise<UserObdFormDto | UserRegisterDto>} - The onboarding form data.
   * @throws {NotFoundException} - If the user is not found.
   * @throws {Error} - If validation fails.
   */
  async getOnboardingForm(
    userId: number,
    authUser: UserEntity,
  ): Promise<UserObdFormDto | UserRegisterDto> {
    //Check valid permission
    if (authUser.id !== userId) {
      throw new ForbiddenException('Only can get obd for yourself');
    }

    // Find the user's onboarding draft
    const userObdDraft = await this.userRepository.findUserDraft(authUser);

    // If the onboarding draft is not found, throw exception
    if (!userObdDraft) {
      throw new UserDraftNotFoundException('User draft not found');
    }

    return userObdDraft;
  }

  /**
   * Change user's password in Sente to get available corresponding aliases.
   * @param userChangePassword - Object containing user's new password and other information.
   * @returns - Indicating if the password change was successful or not.
   */
  async changePassword(
    userId: number,
    authUser: UserEntity,
    userChangePassword: UserChangePasswordDto,
  ) {
    if (authUser.id !== userId) {
      throw new ForbiddenResourceException(
        'User can only change his/her password',
      );
    }

    try {
      // Generate hashed password
      const newPassword = userChangePassword.newPassword;
      const hashedNewPassword = generateHash(newPassword);

      // Change password using Sente service if user has Sente ID

      if (authUser.senteId) {
        const senteUserChangePasswordDto: SenteUserChangePasswordDto = {
          newPassword: hashedNewPassword,
          senteId: authUser.senteId,
        };
        await this.senteService.changePassword(senteUserChangePasswordDto);
      } else {
        throw new ServiceUnavailableException(
          'Sente error handling change password',
        );
      }

      // Check if user needs to change password at their first time
      if (authUser.forceChangePassword) {
        // Change field forceChangePassword to false
        authUser.forceChangePassword = false;
        await this.userRepository.save(authUser);
      }
    } catch (error) {
      // Log the error
      this.logger.error('Error occurred while changing password:', error);

      throw error;
    }
  }

  /**
   * Change avatar for a user.
   *
   * @param {number} userId - The user ID.
   * @param {UserEntity} authUser - The user entity.
   * @param {UserAvatarDto} userAvatarDto - The avatar id and information.
   * @returns {boolean} - Indicates whether the avatar change was successful or not.
   * @throws {ForbiddenException} - Thrown if the user is not authorized to change the avatar.
   * @throws {Error} - Thrown if validation fails.
   */
  async changeAvatar(
    userId: number,
    authUser: UserEntity,
    userAvatarDto: UserAvatarDto,
  ) {
    // Check if the authenticated user is the same as the user trying to change the avatar
    if (authUser.id !== userId) {
      throw new ForbiddenException('User can only change his/her image');
    }

    //Check if image is exsited
    const existedImage = await this.imageService.getImageUrl(
      userAvatarDto.imageId,
    );

    if (!existedImage) {
      throw new FileNotFoundException('Image not found');
    }

    // If the authenticated user doesn't have an avatar, set the new avatar and save it
    if (!authUser.avatar) {
      authUser.avatar = userAvatarDto.imageId;
    }

    // If the authenticated user already has an avatar, delete the old avatar and set the new one
    if (authUser.avatar !== userAvatarDto.imageId) {
      // Delete the old avatar
      await this.imageService.deleteImage(authUser.avatar);
    }

    await this.userRepository.save(authUser);
  }
}
