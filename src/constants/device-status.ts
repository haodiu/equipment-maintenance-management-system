import { type ValueOf } from '../interfaces';
export const DEVICE_STATUS = {
  IN_USE: 'in_use',
  USED: 'used',
  NEED_REPAIR: 'need_repair',
  PENDING: 'pending_disposal',
  DISPOSED: 'disposed',
} as const;

export type DeviceStatusType = ValueOf<typeof DEVICE_STATUS>;
