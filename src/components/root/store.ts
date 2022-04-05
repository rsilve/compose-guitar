import { INIT_APP } from "./actions";
import FeatureFlag from "../../lib/FeatureFlag";
import { IState } from "../../lib/state";
import Action from "../../lib/Action";
import { storage } from "../../lib/gallery_tools";

export function initAppCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === INIT_APP) {
    const st = storage.getLastState();
    if (st) {
      result = { ...result, ...st };
    }
    FeatureFlag.init(result);
    console.info("initialized with local configuration");
  }

  return Promise.resolve(result);
}
