import "./compose-notification";
import { register } from "../../lib/dispatcher";
import { notificationCallback } from "./store";
import { NotificationMessageEnum } from "./NotificationMessageEnum";

register(notificationCallback);

export const messageEnum = NotificationMessageEnum;
export { actionNotificationOpen } from "./actions";
