import { type ValueOf } from '../interfaces';
export const ROLE_TYPE = {
  USER: 'device_user',
  MAINTENANCE_STAFF: 'maintenance_staff',
  ADMIN: 'admin',
} as const;

export type RoleType = ValueOf<typeof ROLE_TYPE>;
