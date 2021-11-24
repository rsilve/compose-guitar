import { HELP_CLOSE, HELP_OPEN, MODALS_CLOSE } from "../../actions/actions";
import { IState } from "../state";
import { Action } from "../../../actions/Action";

export function help_callback(action: Action, state: IState): Promise<IState> {
  if (action.action_type === HELP_OPEN) {
    state.help_open = true;
  }

  if (action.action_type === HELP_CLOSE || action.action_type === MODALS_CLOSE) {
    state.help_open = undefined;
  }

  return Promise.resolve(state);
}
