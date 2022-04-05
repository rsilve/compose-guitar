import { INIT_APP } from "./actions";
import FeatureFlag from "../../lib/FeatureFlag";
import { IState } from "../../lib/state";
import { storage } from "../../lib/register/gallery_tools";
import Action from "../../lib/Action";

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
