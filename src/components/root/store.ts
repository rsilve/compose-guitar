import Action from "../../actions/Action";
import { INIT_APP } from "./actions";
import FeatureFlag from "../../stores/FeatureFlag";
import { IState } from "../../stores/state";
import { storage } from "../../stores/register/gallery_tools";

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
