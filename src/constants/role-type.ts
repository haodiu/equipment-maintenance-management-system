import { type ValueOf } from '../interfaces';
export const ROLE_TYPE = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type RoleType = ValueOf<typeof ROLE_TYPE>;
