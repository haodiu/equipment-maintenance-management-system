import { type ValueOf } from '../interfaces';
export const OBD_STAGE = {
  PRE: 'pre_boarding',
  FIRST_DAY: 'first_day',
  FIRST_WEEK: 'first_week',
  FIRST_MONTH: 'first_month',
  SECOND_MONTH: 'second_month',
  QUALIFYING: 'qualifying',
  OFF: 'off_boarding',
} as const;

export const MAP_OBD_STAGE = {
  [OBD_STAGE.PRE]: 'Pre-Onboarding',
  [OBD_STAGE.FIRST_DAY]: 'Ngày đầu tiên',
  [OBD_STAGE.FIRST_WEEK]: 'Tuần đầu tiên',
  [OBD_STAGE.FIRST_MONTH]: 'Tháng đầu tiền',
  [OBD_STAGE.SECOND_MONTH]: 'Tháng thứ hai',
  [OBD_STAGE.QUALIFYING]: 'Qualifying',
  [OBD_STAGE.OFF]: 'The Explorer',
};

export type ObdStageType = ValueOf<typeof OBD_STAGE>;
