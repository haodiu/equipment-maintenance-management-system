import { type ValueOf } from '../interfaces';
export const LOGBOOK_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
} as const;

export type LogbookStatus = ValueOf<typeof LOGBOOK_STATUS>;
