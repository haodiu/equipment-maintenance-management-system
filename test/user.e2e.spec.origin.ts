import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import type { UserRegisterDto } from '../src/modules/user/domains/dtos/user-register.dto';
import { UserService } from '../src/modules/user/services/user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleUser = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleUser.createNestApplication();
    await app.init();

    userService = app.get(UserService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users/register (POST)', () => {
    //OK
    it('should register a new user & get response', async () => {
      const userRegisterDto: UserRegisterDto = {
        fullName: 'Nguyễn Hoàng Chân Long',
        shortName: 'Long Chân',
        personalEmail: 'chanlog@example.com',
        dob: new Date('2000-07-01'),
        citizenId: '123456789012',
        alias: 'log.nc',
      };

      await request(app.getHttpServer())
        .post('/users/register')
        .send(userRegisterDto)
        .expect(200);
    });

    // email conflict
    it('should return User Email Conflict error', async () => {
      const newUser: UserRegisterDto = {
        fullName: 'John Doe',
        shortName: 'John',
        personalEmail: 'existingemail@example.com',
        dob: new Date('1990-01-01'),
        citizenId: '1234567890',
        alias: 'johndoe',
      };

      // Create an existing user with the same email
      await userService.register(newUser);

      const emailConflict: UserRegisterDto = {
        fullName: 'Jane Smith',
        shortName: 'Jane',
        personalEmail: 'existingemail@example.com', // Same email as existing user
        dob: new Date('1995-05-05'),
        citizenId: '9876543210',
        alias: 'janesmith',
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(emailConflict)
        .expect(409);

      expect(response.body).toEqual({
        statusCode: 409,
        message: 'error.userEmailConflict',
        error: 'User with this email already exists',
      });
    });

    //Alias conflict testt
    it('should return User alias error', async () => {
      const newUser: UserRegisterDto = {
        fullName: 'Minh Luan',
        shortName: 'Luan',
        personalEmail: 'kiemtra@example.com',
        dob: new Date('1990-01-01'),
        citizenId: '1234567890',
        alias: 'luan.m',
      };

      // Create an existing user with the same alias
      await userService.register(newUser);

      const aliasConflict: UserRegisterDto = {
        fullName: 'Hoang Luu',
        shortName: 'luu.h',
        personalEmail: 'test@example.com',
        dob: new Date('1995-05-05'),
        citizenId: '9876543210',
        alias: 'luan.m',
      };

      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(aliasConflict)
        .expect(409);

      expect(response.body).toEqual({
        statusCode: 409,
        message: 'error.aliasConflict',
        error: 'User with this alias already exists',
      });
    });

    // it('should return User CitizenID Conflict error', async () => {
    //   const existingUserRegisterDto: UserRegisterDto = {
    //     fullName: 'John Doe',
    //     shortName: 'John',
    //     personalEmail: 'johndoe@example.com',
    //     dob: new Date('1990-01-01'),
    //     citizenId: '1234567890',
    //     alias: 'johndoe',
    //   };

    //   // Create an existing user with the same CitizenID
    //   await userService.register(existingUserRegisterDto);

    //   const conflictCitizenID: UserRegisterDto = {
    //     fullName: 'Jane Smith',
    //     shortName: 'Jane',
    //     personalEmail: 'janesmith@example.com',
    //     dob: new Date('1995-05-05'),
    //     citizenId: '1234567890', // Same CitizenID
    //     alias: 'janesmith',
    //   };

    //   const response = await request(app.getHttpServer())
    //     .post('/users/register')
    //     .send(conflictCitizenID)
    //     .expect(409);

    //   expect(response.body).toEqual({
    //     statusCode: 409,
    //     message: 'error.userCitizenIDConflict',
    //     error: 'User with this CitizenID already exists',
    //   });
    // });

    // //Email validate
    // it('Unprocessable Entity', async () => {
    //   const invalidUserRegisterDto: UserRegisterDto = {
    //     fullName: 'Nguyễn Hoàng Chân Long',
    //     shortName: 'Long Chân',
    //     personalEmail: '',
    //     dob: new Date('2000-07-01'),
    //     citizenId: '123456789012',
    //     alias: 'log.nc',
    //   };

    //   const response = await request(app.getHttpServer())
    //     .post('/users/register')
    //     .send(invalidUserRegisterDto)
    //     .expect(422);

    //   expect(response.body).toEqual({
    //     statusCode: 422,
    //     message: [
    //       {
    //         target: {
    //           fullName: 'Nguyễn Long',
    //           shortName: 'Long Nguyễn',
    //           personalEmail: 'checkemail.com',
    //           dob: '2000-07-01T00:00:00.000Z',
    //           citizenId: '123456789012',
    //           alias: 'log.nc',
    //         },
    //         value: 'checkemail.com',
    //         property: 'personalEmail',
    //         children: [],
    //         constraints: {
    //           isEmail: '',
    //         },
    //       },
    //     ],
    //     error: 'Unprocessable Entity',
    //   });
    // });
  });
});
