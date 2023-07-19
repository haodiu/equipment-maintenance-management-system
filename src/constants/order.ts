import { type ValueOf } from '../interfaces';
export const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type OderType = ValueOf<typeof ORDER>;
