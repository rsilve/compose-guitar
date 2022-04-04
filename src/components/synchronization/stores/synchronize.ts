import { synchronizer } from "./synchronizer";
import {
  SYNCHRO_ACTIVATION,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_FORCE,
  SYNCHRO_FORCE_START,
  SYNCHRO_SIGN_IN,
  SYNCHRO_SIGN_OUT,
  SYNCHRO_TOGGLE_ENABLED,
} from "../actions";
import { IState } from "../../../stores/state";
import Action from "../../../actions/Action";
import DispatcherError from "../../../stores/DispatcherError";
import { MODALS_CLOSE } from "../../modals/actions";

function synchroActivationRequest(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_ACTIVATION_REQUEST || action.actionType === SYNCHRO_DEACTIVATION_REQUEST) {
    const { synchronization } = result;
    const sync = { ...synchronization, open: true };
    result = { ...result, synchronization: sync };
  }
  return result;
}

function synchroConfigurationClose(action: Action, result: IState) {
  if (action.actionType === MODALS_CLOSE || action.actionType === SYNCHRO_CONFIGURATION_CLOSE) {
    const { synchronization } = result;
    const sync = { ...synchronization, open: undefined };
    result = { ...result, synchronization: sync };
  }
  return result;
}

function synchroActivation(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_ACTIVATION) {
    const { synchronization } = result;
    const sync = { ...synchronization, enabled: true, signInProgress: true };
    result = { ...result, synchronization: sync };
  }
  return result;
}

function synchroDeactivation(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_DEACTIVATION) {
    const { synchronization } = result;
    const sync = { ...synchronization, enabled: false };
    result = { ...result, synchronization: sync };
  }
  return result;
}

async function synchroSignIn(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_SIGN_IN) {
    let { synchronization } = result;
    if (synchronization.enabled) {
      synchronization = await synchronizer
        .signIn()
        .then((valid) => ({ ...synchronization, signInValid: valid, error: undefined }))
        .catch((reason) => ({ ...synchronization, signInValid: false, error: reason }));
      synchronization = { ...synchronization, signInProgress: undefined };
      result = { ...result, synchronization };
    } else {
      synchronization = { ...synchronization, signInValid: undefined, error: undefined, signInProgress: undefined };
      result = { ...result, synchronization };
    }
  }
  return result;
}

function synchroSignOut(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_SIGN_OUT) {
    const { synchronization } = result;
    synchronizer.signOut();
    const sync = {
      ...synchronization,
      signInValid: undefined,
      error: undefined,
      signInProgress: undefined,
      syncInProgress: undefined,
    };
    result = { ...result, synchronization: sync };
  }
  return result;
}

function synchroForceStart(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_FORCE_START) {
    const { synchronization } = result;
    if (synchronization.syncInProgress) {
      throw new DispatcherError("Synchronization in progress");
    }
    let sync = { ...synchronization };
    if (synchronization.enabled && synchronization.signInValid) {
      sync = { ...synchronization, syncInProgress: true };
    }
    result = { ...result, synchronization: sync };
  }
  return result;
}

async function synchroForce(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_FORCE) {
    const { synchronization } = result;
    const count = await synchronizer.download(result);
    console.info("Synchronized songs", count);
    const sync = { ...synchronization, syncInProgress: undefined };
    result = { ...result, synchronization: sync };
  }
  return result;
}

function synchroToggle(action: Action, result: IState) {
  if (action.actionType === SYNCHRO_TOGGLE_ENABLED) {
    const { synchronization, featureFlags } = result;
    const enabled = !featureFlags?.synchro_enabled;
    if (!enabled && synchronization.signInValid) {
      synchronizer.signOut();
    }
    const sync = {
      ...synchronization,
      enabled: false,
      signInValid: undefined,
      error: undefined,
      signInProgress: undefined,
      syncInProgress: undefined,
    };
    const flags = {
      ...featureFlags,
      synchro_enabled: enabled,
    };
    result = { ...result, synchronization: sync, featureFlags: flags };
  }
  return result;
}

export async function synchronizeCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  result = synchroActivationRequest(action, result);

  result = synchroConfigurationClose(action, result);

  result = synchroActivation(action, result);

  result = synchroDeactivation(action, result);

  result = await synchroSignIn(action, result);

  result = synchroSignOut(action, result);

  result = synchroForceStart(action, result);

  result = await synchroForce(action, result);

  result = synchroToggle(action, result);

  return Promise.resolve(result);
}
