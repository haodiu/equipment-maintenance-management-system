import { HttpService } from '@nestjs/axios';
import { type INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import type { IGetAliasesResponseDataType } from '../src/constants';
import { SENTE_API_ENDPOINT } from '../src/constants';
import { ApiConfigService } from '../src/shared/services/api-config.service';

const url = '/users/aliases';

describe(`GET ${url}`, () => {
  let app: INestApplication;
  let mockAxios: MockAdapter;
  let axiosRef: AxiosInstance;
  let senteAliasUrl: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    axiosRef = moduleRef.get<HttpService>(HttpService).axiosRef;
    const apiConfigService = moduleRef.get<ApiConfigService>(ApiConfigService);

    senteAliasUrl = `${apiConfigService.senteConfig.senteBaseUrl}${SENTE_API_ENDPOINT.GET_ALIAS}`;

    await app.init();
  });

  beforeEach(() => {
    mockAxios = new MockAdapter(axiosRef);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return a list of aliases correspond to the full name: Nguyễn Văn A', () => {
    const getAliasesResponseData: IGetAliasesResponseDataType = {
      meta: {
        statusCode: 200,
        message: 'Success',
        error: '',
      },
      data: ['a.nv'],
    };

    const fullName = 'Nguyễn Văn A';

    mockAxios
      .onGet(senteAliasUrl, {
        params: {
          fullName,
        },
      })
      .reply(200, getAliasesResponseData);

    return request(app.getHttpServer())
      .get(url)
      .query({
        fullName,
      })
      .expect(getAliasesResponseData.meta.statusCode)
      .expect({ aliases: getAliasesResponseData.data });
  });

  it('should return error 503 Service Unavailable when sente service is unavailable', () => {
    const fullName = 'Nguyễn Văn A';

    mockAxios
      .onGet(senteAliasUrl, {
        params: {
          fullName,
        },
      })
      .networkError();

    return request(app.getHttpServer())
      .get(url)
      .query({
        fullName,
      })
      .expect(503);
  });

  afterAll(async () => {
    await app.close();
  });
});
