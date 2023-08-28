import { Injectable } from '@nestjs/common';
import type { RoleType } from 'aws-sdk/clients/cognitoidentity';
import { Brackets, DataSource, Repository } from 'typeorm';

import { UserEntity } from '../domains/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  /**
   * Find multiple user entities by their role.
   *
   * @param {RoleType} role - The role type to filter users by.
   * @returns {Promise<UserEntity[] | null>} A promise that resolves to an array of user entities matching the role,
   *                                          or null if no users are found.
   */
  async findManyByRole(role: RoleType): Promise<UserEntity[] | null> {
    return this.find({
      where: {
        role,
        isDeleted: false,
      },
    });
  }

  /**
   * Find a single user entity using filter options.
   *
   * @param {Partial<{ id: number; email: string }>} options - Filter options to narrow down the search.
   * @returns {Promise<UserEntity | null>} A promise that resolves to the found user entity,
   *                                      or null if no user is found.
   */
  async findOneByFilter(
    options: Partial<{
      id: number;
      email: string;
      resetPasswordToken: string;
    }>,
  ): Promise<UserEntity | null> {
    const queryBuilder = this.createQueryBuilder('user');

    queryBuilder
      .where('user.is_deleted = :isDeleted', { isDeleted: false })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.id = :id', { id: options.id }).orWhere(
            'user.email = :email',
            { email: options.email },
          );
        }),
      );

    if (options.resetPasswordToken) {
      queryBuilder.andWhere('user.reset_password_token = :resetPasswordToken', {
        resetPasswordToken: options.resetPasswordToken,
      });
    }

    return queryBuilder.getOne();
  }
}
