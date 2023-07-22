import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

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
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({
      where: {
        email,
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
      .where('user.id = :id', { id: options.id })
      .orWhere('user.email = :email', { email: options.email });

    return queryBuilder.getOne();
  }
}
