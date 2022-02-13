import { INIT_APP, TRANSPOSE_CHANGE, ZOOM_CHANGE } from "../../actions/actions";
import { getLastState } from "./gallery_tools";
import { IState } from "../state";
import Action from "../../actions/Action";
import FeatureFlag from "../FeatureFlag";

export function initAppCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === INIT_APP) {
    const st = getLastState();
    if (st) {
      result = { ...result, ...st };
    }
    FeatureFlag.init(result);
    console.info("initialized with local configuration");
  }

  return Promise.resolve(result);
}

export function zoomChangeCallback(action: Action, state: IState): Promise<IState> {
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
  return Promise.resolve(result);
}

export function transposeChangeCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === TRANSPOSE_CHANGE) {
    let { transpose } = action.payload as { transpose: number };
    if (!transpose || Number.isNaN(Number(transpose))) {
      transpose = 0;
    }
    transpose = Math.min(12, transpose);
    transpose = Math.max(-12, transpose);
    result = { ...result, transpose };
  }
  return Promise.resolve(result);
}
