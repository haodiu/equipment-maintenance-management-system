import { type ValueOf } from '../interfaces';
export const DEVICE_STATUS = {
  IN_USE: 'Đang sử dụng',
  NOT_USED: 'Chưa sử dụng',
  NEED_REPAIR: 'Cần sửa chữa',
  NEED_REPLACE: 'Cần thay thế',
  NEED_RECALL: 'Cần thu hồi',
  PENDING_DISPOSAL: 'Đề xuất thanh lý',
  DISPOSED: 'Đã thanh lý',
} as const;

export type DeviceStatusType = ValueOf<typeof DEVICE_STATUS>;
