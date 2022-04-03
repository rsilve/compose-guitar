import { MODALS_CLOSE } from "../../actions/actions";
import Action from "../../actions/Action";
import { TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "./actions";
import { IState } from "../../stores/state";

export async function confirmSaveCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };

  if (action.actionType === TRACK_NEW_WITHOUT_SAVE) {
    result = {
      ...result,
      editor: {},
      transpose: 0,
      confirm_save: undefined,
    };
  }

  if (action.actionType === TRACK_NEW_CANCEL || action.actionType === MODALS_CLOSE) {
    result.confirm_save = undefined;
    result.editor = undefined;
  }

  return Promise.resolve(result);
}
