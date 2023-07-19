import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import type { IGetAliasesResponseDataType } from '../../constants';
import { SENTE_API_ENDPOINT } from '../../constants';
import { ServiceUnavailableException } from '../../exceptions';
import type { SenteUserChangePasswordDto } from '../../modules/user/domains/dtos/user-change-password.dto';
import type { UserRegisterDto } from '../../modules/user/domains/dtos/user-register.dto';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class SenteService {
  private logger = new Logger('SenteService');

  constructor(
    private readonly httpService: HttpService,
    private readonly apiConfigService: ApiConfigService,
  ) {}

  /**
   * Send users' fullName to Sente server to get available corresponded aliases
   * @param fullName - is for query to sente service to generate alias, e.g., "Nguyen Van A"
   * @returns {AliasesDto}- is for generate list of available aliases correspond to user's fullName
   */
  async generateAliases(fullName: string): Promise<string[]> {
    try {
      // Try to call sente generate alias
      // Setup parameters for axios
      const url = `${this.apiConfigService.senteConfig.senteBaseUrl}${SENTE_API_ENDPOINT.GET_ALIAS}`;
      const params = {
        fullName,
      };
      const auth = {
        username: this.apiConfigService.senteConfig.username,
        password: this.apiConfigService.senteConfig.password,
      };

      // Specify response data type of get alias api
      const res =
        await this.httpService.axiosRef.get<IGetAliasesResponseDataType>(url, {
          params,
          auth,
        });

      return res.data.data;
    } catch (error) {
      this.logger.error('Error occurred during generate at Sente:', error);

      // Throw Service Unavailable
      throw new ServiceUnavailableException('Sente unavailable');
    }
  }

  /***
   * Send user register information to sente
   * @async
   * @method
   * @param {UserRegisterDto} userRegister - user register information
   * @returns Promise<any>
   */
  async registerUser(userRegister: UserRegisterDto) {
    try {
      const { senteRegisterBaseUrl } = this.apiConfigService.senteConfig;
      const url = `${senteRegisterBaseUrl}`;

      const response = await this.httpService.axiosRef.post(url, userRegister);

      return response.data;
    } catch (error) {
      this.logger.error(
        'Error occurred during user registration at Sente: ',
        error,
      );
    }
  }

  /**
   * Updates the user's password in the Sente server.
   * @param email - The user's email.
   * @param newPassword - The new password.
   * @returns The response data from the server.
   */
  async changePassword(userChangePassword: SenteUserChangePasswordDto) {
    // Get configuration values
    const { username, password, senteMockHost } =
      this.apiConfigService.senteConfig;

    // Construct API endpoint URL
    const url = `${senteMockHost}${SENTE_API_ENDPOINT.UPDATE_PASSWORD}`;

    // Prepare request body
    const requestBody = userChangePassword;

    // Prepare authentication credentials
    const auth = {
      username,
      password,
    };

    try {
      // Send PATCH request to change password
      await this.httpService.axiosRef.patch(url, {
        body: requestBody,
        auth,
      });
    } catch (error) {
      // Log error
      this.logger.error(error);

      // Throw Service Unavailable exception
      throw new ServiceUnavailableException();
    }
  }
}
