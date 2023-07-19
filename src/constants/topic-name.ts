import { type ValueOf } from '../interfaces';
export const TOPIC_NAME = {
  GENERAL_SENTE: 'app_sente.>',
  UPDATE_USER_OFFICIAL: 'app_sente.event_update.update_user_official',
  UPDATE_NOTIFICATION: 'app_sente.event_update.update_notification',
  UPDATE_MISSION: 'app_sente.event_update.update_mission',
} as const;

export type TopicName = ValueOf<typeof TOPIC_NAME>;
