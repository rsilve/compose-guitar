import {
  MODALS_CLOSE,
  SYNCHRO_ACTIVATION,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_SIGN_IN,
  SYNCHRO_SIGN_OUT,
} from "../../actions/actions";
import { IState } from "../state";
import Action from "../../actions/Action";
import { synchronizer } from "./synchronizer";

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
    const sync = { ...synchronization, enabled: true, inProgress: true };
    result = { ...result, synchronization: sync };
  }

  if (action.action_type === SYNCHRO_DEACTIVATION) {
    const { synchronization } = result;
    const sync = { ...synchronization, enabled: false };
    result = { ...result, synchronization: sync };
  }

  if (action.action_type === SYNCHRO_SIGN_IN) {
    let { synchronization } = result;
    if (synchronization.enabled) {
      synchronization = await synchronizer
        .signIn()
        .then((valid) => ({ ...synchronization, signInValid: valid, error: undefined }))
        .catch((reason) => ({ ...synchronization, signInValid: false, error: reason }));
      synchronization = { ...synchronization, inProgress: undefined };
      result = { ...result, synchronization };
    } else {
      synchronization = { ...synchronization, signInValid: undefined, error: undefined, inProgress: undefined };
      result = { ...result, synchronization };
    }
  }

  if (action.action_type === SYNCHRO_SIGN_OUT) {
    const { synchronization } = result;
    synchronizer.signOut();
    const sync = { ...synchronization, signInValid: undefined, error: undefined, inProgress: undefined };
    result = { ...result, synchronization: sync };
  }

  return Promise.resolve(result);
}
