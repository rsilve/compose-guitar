import { SAVE_AS_START, SAVE_AS_START_AND_NEW } from "../../actions/actions";
import { add_to_gallery } from "./gallery_tools";
import { IState, IStateTrack } from "../state";
import Action from "../../actions/Action";

function save(state: IState): IState {
  let result = { ...state };
  if (result.track && result.track.title) {
    const { track = {} } = result;
    const tr: IStateTrack = { ...track, saved_at: new Date().toISOString() };
    result = add_to_gallery(tr, result);
    result = { ...result, confirm_save: undefined };
  }
  return result;
}

export function save_as_callback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.action_type === SAVE_AS_START) {
    result = save(result);
  }

  if (action.action_type === SAVE_AS_START_AND_NEW) {
    result = save(result);
    result = { ...result, editor: {}, transpose: 0 };
  }

  return Promise.resolve(result);
}
