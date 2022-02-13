import { GALLERY_CLOSE, GALLERY_OPEN, GALLERY_REMOVE, MODALS_CLOSE } from "../../actions/actions";
import { removeFromGallery } from "./gallery_tools";
import { IState } from "../state";
import Action from "../../actions/Action";
import { synchronizer } from "./synchronizer";

export async function galleryCallback(action: Action, state: IState): Promise<IState> {
  const result = state;
  if (action.actionType === GALLERY_OPEN) {
    result.gallery = true;
  }

  if (action.actionType === GALLERY_REMOVE) {
    const { id } = action.payload as { id: string };
    removeFromGallery(id);
    if (result.synchronization.enabled) {
      await synchronizer.remove(id);
    }
    delete result.gallery;
  }

  if (action.actionType === GALLERY_CLOSE || action.actionType === MODALS_CLOSE) {
    result.gallery = undefined;
  }
  return Promise.resolve(result);
}
