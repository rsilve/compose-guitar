import { IState } from "../../lib/state";
import { ZOOM_CHANGE } from "./actions";
import Action from "../../lib/Action";

export async function zoomChangeCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === ZOOM_CHANGE) {
    let { zoom } = action.payload as { zoom: number };
    if (!zoom || Number.isNaN(zoom)) {
      zoom = 100;
    }
    zoom = Math.min(200, zoom);
    zoom = Math.max(10, zoom);
    result = { ...result, zoom };
  }
  return result;
}
