const SENTE_API_PATH = '/senteapi';

export const SENTE_API_ENDPOINT = {
  GET_ALIAS: `${SENTE_API_PATH}/geek/alias`,
  UPDATE_PASSWORD: `${SENTE_API_PATH}/geek/password`,
};

export interface IGetAliasesResponseDataType {
  meta: {
    statusCode: number;
    message: string;
    error: string;
  };
  data: string[];
}
