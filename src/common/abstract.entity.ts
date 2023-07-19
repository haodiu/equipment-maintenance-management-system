import { CreateDateColumn } from 'typeorm';

import type { Constructor } from '../types';
import type { AbstractDto } from './dto/abstract.dto';

export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
  createdAt: Date;
  updatedAt: Date;
  toDto(options?: O): DTO;
}

export abstract class AbstractEntity<
  DTO extends AbstractDto = AbstractDto,
  O = never,
> implements IAbstractEntity<DTO, O>
{
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  private dtoClass?: Constructor<DTO, [AbstractEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new dtoClass(this, options);
  }
}
