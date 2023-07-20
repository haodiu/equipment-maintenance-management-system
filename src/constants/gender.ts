import { type ValueOf } from '../interfaces';
export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

export type Gender = ValueOf<typeof GENDER>;
