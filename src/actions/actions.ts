import Action from "./Action";
import { publishAction } from "./publish_action";
import { NotificationMessageEnum } from "../components/notification/NotificationMessageEnum";

export const INIT_APP = "INIT_APP";
export const actionInitApp = (): Promise<void> => publishAction(new Action(INIT_APP));

export const NOTIFICATION_OPEN = "NOTIFICATION_OPEN";
export const actionNotificationOpen = (message: NotificationMessageEnum): void => {
  setTimeout(() => {
    publishAction(new Action(NOTIFICATION_OPEN, { message }));
  }, 100);
};

export const NOTIFICATION_CLOSE = "NOTIFICATION_CLOSE";
export const actionNotificationClose = (): void => {
  publishAction(new Action(NOTIFICATION_CLOSE));
};

export interface IPayloadEditor {
  title?: string;
  grid_text?: string;
  updated_at?: string;
}

export const MODALS_CLOSE = "MODALS_CLOSE";
export const actionModalsClose = (): void => {
  publishAction(new Action(MODALS_CLOSE));
};
