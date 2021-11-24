import { NOTIFICATION_CLOSE, NOTIFICATION_OPEN } from "../../actions/actions";
import { IState } from "../state";
import { Action } from "../../../actions/Action";

export function notification_callback(action: Action, state: IState): Promise<IState> {
  if (action.action_type === NOTIFICATION_OPEN) {
    const { message } = action.payload as { message: string };
    state.notification = message;
  }
  if (action.action_type === NOTIFICATION_CLOSE) {
    state.notification = undefined;
  }

  return Promise.resolve(state);
}
