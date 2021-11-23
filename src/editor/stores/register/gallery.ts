import {
  GALLERY_CLOSE,
  GALLERY_OPEN,
  GALLERY_REMOVE,
  MODALS_CLOSE,
} from "../../actions/actions";
import { remove_from_gallery } from "./gallery_tools";
import { IState } from "../state";
import { Action } from "../../../actions/Action";

export function gallery_callback(
  action: Action,
  state: IState
): Promise<IState> {
  if (action.action_type === GALLERY_OPEN) {
    state.gallery = true;
  }

  if (action.action_type === GALLERY_REMOVE) {
    const { id } = action.payload as { id: string };
    remove_from_gallery(id);
    delete state.gallery;
  }

  if (
    action.action_type === GALLERY_CLOSE ||
    action.action_type === MODALS_CLOSE
  ) {
    state.gallery = undefined;
  }
  return Promise.resolve(state);
}
