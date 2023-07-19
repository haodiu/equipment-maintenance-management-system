import { type ValueOf } from '../interfaces';
export const TOKEN_TYPE = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export type TokenType = ValueOf<typeof TOKEN_TYPE>;
