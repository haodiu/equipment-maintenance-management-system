import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { generateHash, validateHash } from '../../../common/utils';
import { UserNotFoundException } from '../../../exceptions';
import { Unauthorized } from '../../../exceptions/unauthorized.exception';
import type { IJwtClaims } from '../../../interfaces/IJwtClaims';
import { GeneratorProvider } from '../../../providers';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { MailService } from '../../../shared/services/mail/mail.service';
import { UserService } from '../../user/services/user.service';
import type { EmailDto } from '../dtos/email.dto';
import type { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import type { ResetPasswordDto } from '../dtos/reset-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly apiConfigService: ApiConfigService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Generate accessToken from payload, it include id & role of the user
   * @param payload
   * @returns accessToken with type is string
   */
  generateAccessToken(payload: IJwtClaims): string {
    return this.jwtService.sign(payload, {
      secret: this.apiConfigService.authConfig.accessTokenPrivateKey,
      expiresIn: this.apiConfigService.authConfig.accessTokenExpirationTime,
    });
  }

  /**
   * Validate Admin by email and password
   * @param credential
   * @returns LoginResponseDto
   */
  async validateAdminSignIn(credential: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = credential;
    const user = await this.userService.findOneByFilterOptions({ email });

    if (!user) {
      throw new UserNotFoundException('Admin not found');
    }

    const isPasswordValid = await validateHash(password, user.password);

    if (!isPasswordValid) {
      throw new Unauthorized('Invalid credentials');
    }

    const payload: IJwtClaims = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);

    return new LoginResponseDto(user, accessToken);
  }

  /**
   * Generates a random token for password reset, associates it with the user,
   * sends the token to the user's email, and sets an expiration time for the token.
   *
   * @param {EmailDto} emailDto - An object containing the user's email.
   * @returns {Promise<void>} A Promise that resolves when the token generation and email sending are completed.
   * @throws {UserNotFoundException} If the user with the provided email is not found.
   */
  async createForgotPasswordToken(emailDto: EmailDto): Promise<void> {
    const { email } = emailDto;
    const user = await this.userService.findOneByFilterOptions({ email });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    const token = GeneratorProvider.generateRandomString(10);
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiration = new Date(Date.now() + 600_000); // Expiry in 10 min
    await this.userService.setUser(user);
    await this.mailService.sendUserToken(email, token);
  }

  /**
   * Resets the user's password using the provided token after validation.
   *
   * @param {ResetPasswordDto} resetPasswordDto - An object containing email, token, and new password.
   * @returns {Promise<void>} A Promise that resolves when the password reset is completed.
   * @throws {NotFoundException} If the email or token is invalid or expired.
   */
  async resetPasswordWithToken(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const { email, token, newPassword } = resetPasswordDto;

    const user = await this.userService.findOneByFilterOptions({
      email,
      resetPasswordToken: token,
    });

    if (!user || user.resetPasswordTokenExpiration <= new Date()) {
      throw new NotFoundException('Invalid email or token');
    }

    // Update the password for the user
    const newPasswordHashed = generateHash(newPassword);
    user.password = newPasswordHashed;
    user.resetPasswordToken = '';
    await this.userService.setUser(user);
  }
}
