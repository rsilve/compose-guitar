import { NOTIFICATION_CLOSE, NOTIFICATION_OPEN } from "../../actions/actions";
import { IState } from "../state";
import Action from "../../actions/Action";

export function notification_callback(action: Action, state: IState): Promise<IState> {
  const result = state;
  if (action.actionType === NOTIFICATION_OPEN) {
    const { message } = action.payload as { message: string };
    result.notification = message;
  }
  if (action.actionType === NOTIFICATION_CLOSE) {
    result.notification = undefined;
  }

  return Promise.resolve(result);
}
