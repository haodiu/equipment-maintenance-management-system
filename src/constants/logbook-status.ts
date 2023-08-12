import { type ValueOf } from '../interfaces';
export const LOGBOOK_STATUS = {
  PENDING: 'Đang chờ',
  CONFIRMED: 'Đã xác nhận',
  REJECTED: 'Đã từ chối',
  IN_PROGRESS: 'Đang thực hiện',
  COMPLETED: 'Đã hoàn thành',
  CANCELED: 'Đã huỷ',
} as const;

export type LogbookStatusType = ValueOf<typeof LOGBOOK_STATUS>;
