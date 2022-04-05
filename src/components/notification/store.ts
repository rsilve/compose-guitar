import { NotificationMessageEnum } from "./NotificationMessageEnum";
import { IState } from "../../lib/state";
import { NOTIFICATION_CLOSE, NOTIFICATION_OPEN } from "./actions";
import Action from "../../lib/Action";

export function notificationCallback(action: Action, state: IState): Promise<IState> {
  const result = state;
  if (action.actionType === NOTIFICATION_OPEN) {
    const { message } = action.payload as { message: NotificationMessageEnum };
    result.notification = message;
  }
  if (action.actionType === NOTIFICATION_CLOSE) {
    result.notification = undefined;
  }

  return Promise.resolve(result);
}
