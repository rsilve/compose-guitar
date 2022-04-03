import { IPayloadEditor, MODALS_CLOSE } from "../../actions/actions";
import Action from "../../actions/Action";
import { TRACK_COPY, TRACK_NEW, TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE, TRACK_PASTE } from "./actions";
import { IState } from "../../stores/state";
import { saveNeeded } from "../../tools/state_tools";

export async function createAndSaveCallback(action: Action, state: IState): Promise<IState> {
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

  if (action.actionType === TRACK_NEW) {
    const { track = {} } = result;
    if (saveNeeded(track)) {
      result = { ...result, confirm_save: true };
    } else {
      result = {
        ...result,
        track: { ...track, id: undefined },
        editor: {},
        transpose: 0,
      };
    }
  }

  if (action.actionType === TRACK_COPY) {
    const { title, grid_text } = action.payload as IPayloadEditor;
    await navigator.clipboard.writeText(JSON.stringify({ title, grid_text }));
  }

  if (action.actionType === TRACK_PASTE) {
    await navigator.clipboard.readText().then((t) => {
      result.track = JSON.parse(t);
    });
  }

  return Promise.resolve(result);
}
