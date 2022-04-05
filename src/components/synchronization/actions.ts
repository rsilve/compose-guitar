import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";

export const SYNCHRO_CONFIGURATION_CLOSE = "SYNCHRO_CONFIGURATION_CLOSE";
export const actionSynchronizationConfigurationClose = (): Promise<void> =>
  publishAction(new Action(SYNCHRO_CONFIGURATION_CLOSE));

export const SYNCHRO_ACTIVATION = "SYNCHRO_ACTIVATION";
export const actionSynchronizationActivation = (): Promise<void> => publishAction(new Action(SYNCHRO_ACTIVATION));

export const SYNCHRO_DEACTIVATION = "SYNCHRO_DEACTIVATION";
export const actionSynchronizationDeactivation = (): Promise<void> => publishAction(new Action(SYNCHRO_DEACTIVATION));

export const SYNCHRO_SIGN_OUT = "SYNCHRO_SIGN_OUT";
export const actionSynchroSignOut = (): Promise<void> => publishAction(new Action(SYNCHRO_SIGN_OUT));

export const SYNCHRO_ACTIVATION_REQUEST = "SYNCHRO_ACTIVATION_REQUEST";
export const actionSynchronizationActivationRequest = (): Promise<void> =>
  publishAction(new Action(SYNCHRO_ACTIVATION_REQUEST));

export const SYNCHRO_DEACTIVATION_REQUEST = "SYNCHRO_DEACTIVATION_REQUEST";
export const actionSynchronizationDeactivationRequest = (): Promise<void> =>
  publishAction(new Action(SYNCHRO_DEACTIVATION_REQUEST));

export const SYNCHRO_SIGN_IN = "SYNCHRO_SIGN_IN";
export const actionSynchroSignIn = (): Promise<void> => publishAction(new Action(SYNCHRO_SIGN_IN));

export const SYNCHRO_FORCE_START = "SYNCHRO_FORCE_START";
export const actionSynchroForceStart = (): Promise<void> => publishAction(new Action(SYNCHRO_FORCE_START));

export const SYNCHRO_FORCE = "SYNCHRO_FORCE";
export const actionSynchroForce = (): Promise<void> => publishAction(new Action(SYNCHRO_FORCE));

export const SYNCHRO_TOGGLE_ENABLED = "SYNCHRO_TOGGLE_ENABLED";
export const actionSynchroToggleEnable = (): Promise<void> => publishAction(new Action(SYNCHRO_TOGGLE_ENABLED));
