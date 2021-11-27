import {
  MODALS_CLOSE,
  SYNCHRO_ACTIVATION,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_SIGN_IN,
} from "../../actions/actions";
import { IState } from "../state";
import Action from "../../../actions/Action";
import { googleApiWrapper } from "./google-api";

export async function synchronize_callback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.action_type === SYNCHRO_ACTIVATION_REQUEST || action.action_type === SYNCHRO_DEACTIVATION_REQUEST) {
    const { synchronization } = result;
    const sync = { ...synchronization, open: true };
    result = { ...result, synchronization: sync };
  }

  if (action.action_type === MODALS_CLOSE || action.action_type === SYNCHRO_CONFIGURATION_CLOSE) {
    const { synchronization } = result;
    const sync = { ...synchronization, open: undefined };
    result = { ...result, synchronization: sync };
  }

  if (action.action_type === SYNCHRO_ACTIVATION) {
    const { synchronization } = result;
    const sync = { ...synchronization, enabled: true };
    result = { ...result, synchronization: sync };
  }

  if (action.action_type === SYNCHRO_DEACTIVATION) {
    const { synchronization } = result;
    const sync = { ...synchronization, enabled: false };
    result = { ...result, synchronization: sync };
  }

  if (action.action_type === SYNCHRO_SIGN_IN) {
    const { synchronization } = result;
    if (synchronization.enabled) {
      const valid = await googleApiWrapper.signIn();
      const sync = { ...synchronization, signInValid: valid };
      result = { ...result, synchronization: sync };
    } else {
      const sync = { ...synchronization, signInValid: undefined };
      result = { ...result, synchronization: sync };
    }
  }

  return Promise.resolve(result);
}
