import { actionNotificationOpen, UPLOAD_FROM_GALLERY } from "../../actions/actions";
import { get_from_gallery } from "./gallery_tools";
import Action from "../../actions/Action";
import { IState } from "../state";

export function upload_callback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.action_type === UPLOAD_FROM_GALLERY) {
    const { id } = action.payload as { id: string };
    const grid = get_from_gallery(id);
    const { synchronization, featureFlags } = result;
    result = { ...result, ...grid, synchronization, featureFlags, gallery: undefined };
    actionNotificationOpen("Track loaded");
  }

  return Promise.resolve(result);
}
