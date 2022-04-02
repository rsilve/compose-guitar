import {
  IPayloadEditor,
  MODALS_CLOSE,
  TRACK_COPY,
  TRACK_EDIT,
  TRACK_EDIT_APPLY,
  TRACK_EDIT_CANCEL,
  TRACK_NEW,
  TRACK_PASTE,
} from "../../actions/actions";
import { IState } from "../state";
import { saveNeeded } from "../../tools/state_tools";
import Action from "../../actions/Action";
import { uuid } from "../../tools/uuid";
import { TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "../../components/confirmSave/actions";

export async function trackCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
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
