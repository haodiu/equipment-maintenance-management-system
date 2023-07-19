import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import type { UserRegisterDto } from '../src/modules/user/domains/dtos/user-register.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users/register (POST)', () => {
    it('should register a new user & get response', async () => {
      const userRegisterDto: UserRegisterDto = {
        fullName: 'Nguyễn Hoàng Chân Long',
        shortName: 'Long Chân',
        personalEmail: 'chanlog@example.com',
        dob: new Date('2000-07-01'),
        citizenId: '123456789012',
        alias: 'log.nc',
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(userRegisterDto)
        .expect(200);

      expect(response.body).toEqual({
        meta: {
          statusCode: 200,
          message: '',
          error: '',
        },
        result: {},
      });
    });
  });
});
