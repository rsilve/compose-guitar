import { UPLOAD_FROM_GALLERY } from "../../actions/actions";
import { getFromGallery } from "./gallery_tools";
import Action from "../../actions/Action";
import { IState } from "../state";

export function uploadCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === UPLOAD_FROM_GALLERY) {
    const { id } = action.payload as { id: string };
    const grid = getFromGallery(id);
    const { synchronization, featureFlags } = result;
    result = { ...result, ...grid, synchronization, featureFlags, gallery: undefined };
  }

  return Promise.resolve(result);
}
