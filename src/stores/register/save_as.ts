import { SAVE_AS_START } from "../../actions/actions";
import { addToGallery } from "./gallery_tools";
import { IState, IStateTrack } from "../state";
import Action from "../../actions/Action";
import { synchronizer } from "./synchronizer";
import { SAVE_AS_START_AND_NEW } from "../../components/confirmSave/actions";

async function save(state: IState): Promise<IState> {
  let result = { ...state };
  if (result.track && result.track.title) {
    const { track = {} } = result;
    const tr: IStateTrack = { ...track, saved_at: new Date().toISOString() };
    result = addToGallery(tr, result);
    if (result.synchronization.enabled) {
      await synchronizer.upload(tr);
    }
    result = { ...result, confirm_save: undefined };
  }
  return result;
}

export async function saveAsCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === SAVE_AS_START) {
    result = await save(result);
  }

  if (action.actionType === SAVE_AS_START_AND_NEW) {
    result = await save(result);
    result = { ...result, editor: {}, transpose: 0 };
  }

  return Promise.resolve(result);
}
