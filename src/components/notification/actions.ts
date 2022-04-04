import { NotificationMessageEnum } from "./NotificationMessageEnum";
import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

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
