import { INIT_APP } from "../../actions/actions";
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
