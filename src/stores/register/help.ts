import { HELP_CLOSE, HELP_OPEN, MODALS_CLOSE } from "../../actions/actions";
import { IState } from "../state";
import Action from "../../actions/Action";

export function helpCallback(action: Action, state: IState): Promise<IState> {
  const result = state;
  if (action.actionType === HELP_OPEN) {
    result.help_open = true;
  }

  if (action.actionType === HELP_CLOSE || action.actionType === MODALS_CLOSE) {
    result.help_open = undefined;
  }

  return Promise.resolve(result);
}
