import { type ValueOf } from '../interfaces';
export const DEVICE_STATUS = {
  IN_USE: 'in_use',
  NOT_USED: 'not_used',
  NEED_REPAIR: 'need_repair',
  PENDING_DISPOSAL: 'pending_disposal',
  DISPOSED: 'disposed',
} as const;

export type DeviceStatusType = ValueOf<typeof DEVICE_STATUS>;
