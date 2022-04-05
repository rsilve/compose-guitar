import { IState } from "../../lib/state";
import { GALLERY_CLOSE, GALLERY_OPEN, GALLERY_REMOVE, UPLOAD_FROM_GALLERY } from "./actions";
import { synchronizer } from "../synchronization/stores/synchronizer";
import { MODALS_CLOSE } from "../modals/actions";
import Action from "../../lib/Action";
import { storage } from "../../lib/gallery_tools";

export async function galleryCallback(action: Action, state: IState): Promise<IState> {
  const result = state;
  if (action.actionType === GALLERY_OPEN) {
    result.gallery = true;
  }

  if (action.actionType === GALLERY_REMOVE) {
    const { id } = action.payload as { id: string };
    storage.removeFromGallery(id);
    if (result.synchronization.enabled) {
      await synchronizer.remove(id);
    }
    delete result.gallery;
  }

  if (action.actionType === GALLERY_CLOSE || action.actionType === MODALS_CLOSE) {
    result.gallery = undefined;
  }
  return result;
}

export async function uploadCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === UPLOAD_FROM_GALLERY) {
    const { id } = action.payload as { id: string };
    const grid = storage.getFromGallery(id);
    const { synchronization, featureFlags } = result;
    result = { ...result, ...grid, synchronization, featureFlags, gallery: undefined };
  }

  return result;
}
