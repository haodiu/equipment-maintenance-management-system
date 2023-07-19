export interface IAdminJwtClaims {
  username: string;
  role: string;
}

export interface IUserJwtClaims {
  id: number;
  role: string;
}
