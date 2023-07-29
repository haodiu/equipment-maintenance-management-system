import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { UserEntity } from '../domains/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({
      where: {
        email,
        isDeleted: false,
      },
    });
  }

  async findOneByFilter(
    options: Partial<{
      id: number;
      email: string;
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

    return queryBuilder.getOne();
  }
}
