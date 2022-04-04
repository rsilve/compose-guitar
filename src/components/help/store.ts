import Action from "../../actions/Action";
import { HELP_CLOSE, HELP_OPEN } from "./actions";
import { IState } from "../../stores/state";
import { MODALS_CLOSE } from "../modals/actions";

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
