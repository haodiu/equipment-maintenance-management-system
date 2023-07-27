import { HttpStatus } from '@nestjs/common';

// System error messages
export const ERROR_SYSTEM = 'error.system';

// File error messages
export const ERROR_FILE_NOT_IMAGE = 'error.fileNotImage';
export const ERROR_FILE_NOT_FOUND = 'error.fileNotFound';
export const ERROR_FILE_NOT_HANDLE = 'error.fileNotHandle';

// User Module error messages
export const ERROR_USER_NOT_FOUND = 'error.userNotFound';
export const ERROR_UNIQUE_EMAIL = 'error.unique.email';
export const ERROR_USER_CONFLICT = 'error.userConflict';

// Device Module error messages
export const ERROR_DEVICE_NOT_FOUND = 'error.deviceNotFound';
export const ERROR_DEVICE_TYPE_NOT_FOUND = 'error.deviceTypeNotFound';

// Logbook Module error messages
export const ERROR_LOGBOOK_NOT_FOUND = 'error.logbookNotFound';

// Liquidation Module error messages
export const ERROR_LIQUIDATION_NOT_FOUNS = 'error.liquidationNotFound';

// Obd Stage error messages
export const ERROR_OBD_STAGE_NOT_FOUND = 'error.obdStageNotFound';

// Error refreshToken expired
export const ERROR_REFRESH_TOKEN_EXPIRED = 'error.refreshTokenExpired';

// Error Unauthorized
export const ERROR_UNAUTHORIZED = 'error.unauthorized';
export const ERROR_SUBMIT_OBD_DRAFT = 'error.submitObdDraft';

// Error Forbiden Resource
export const ERROR_FORBBIDEN_RESOURCE = 'error.forbbidenResource';

// User draft error messages
export const ERROR_USER_DRAFT_NOT_FOUND = 'error.userDraftNotFound';

// Page error messages
export const ERROR_PAGE_TYPE = 'error.pageType';
export const ERROR_FORCE_CHANGE_PASSWORD = 'error.forceChangePasswordException';

//Third-party error messages
export const ERROR_SERVICE_UNAVAILABLE = 'error.serviceUnavailable';

export const CONSTRAINT_ERRORS: Record<string, string | string[]> = {
  // System error
  SYS_000: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
  SYS_002: HttpStatus.UNPROCESSABLE_ENTITY.toString(),
  SYS_003: HttpStatus.SERVICE_UNAVAILABLE.toString(),

  // File error
  FILE_001: ERROR_FILE_NOT_IMAGE,
  FILE_002: ERROR_FILE_NOT_FOUND,
  FILE_003: ERROR_FILE_NOT_HANDLE,

  // User Module error
  USER_001: ERROR_USER_NOT_FOUND,
  USER_002: [ERROR_UNIQUE_EMAIL, HttpStatus.UNAUTHORIZED.toString()],
  USER_423: ERROR_FORCE_CHANGE_PASSWORD,
  USER_003: ERROR_UNAUTHORIZED,
  USER_004: ERROR_USER_CONFLICT,

  // Device Module error
  DEVICE_001: ERROR_DEVICE_NOT_FOUND,
  DEVICE_002: ERROR_DEVICE_TYPE_NOT_FOUND,

  // Logbook Module error
  LOGBOOK_001: ERROR_LOGBOOK_NOT_FOUND,

  // Liquidation Module error
  LIQUIDATION_001: ERROR_LIQUIDATION_NOT_FOUNS,

  // Obd Stage error
  STAGE_001: ERROR_OBD_STAGE_NOT_FOUND,

  // Page error
  PAGE_001: ERROR_PAGE_TYPE,

  // Token error
  TOKEN_001: ERROR_REFRESH_TOKEN_EXPIRED,
};
