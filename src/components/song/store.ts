import { TRACK_EDIT, TRACK_EDIT_APPLY, TRACK_EDIT_CANCEL } from "./actions";
import { IPayloadEditor, MODALS_CLOSE } from "../../actions/actions";
import { uuid } from "../../tools/uuid";
import Action from "../../actions/Action";
import { IState } from "../../stores/state";

export function songEditCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === TRACK_EDIT) {
    const { title, grid_text } = action.payload as IPayloadEditor;
    result.editor = { title, grid_text };
  }

  if (action.actionType === TRACK_EDIT_CANCEL || action.actionType === MODALS_CLOSE) {
    result.editor = undefined;
  }

  if (action.actionType === TRACK_EDIT_APPLY) {
    const { title, grid_text, updated_at } = action.payload as IPayloadEditor;
    let { track = {} } = result;
    track = {
      ...track,
      title,
      grid_text,
      updated_at,
    };
    if (!track.id) {
      track.id = uuid();
    }
    result = { ...result, track, editor: undefined };
  }
  return Promise.resolve(result);
}
