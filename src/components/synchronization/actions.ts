import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

export const SYNCHRO_CONFIGURATION_CLOSE = "SYNCHRO_CONFIGURATION_CLOSE";
export const actionSynchronizationConfigurationClose = (): Promise<void> =>
  publishAction(new Action(SYNCHRO_CONFIGURATION_CLOSE));

export const SYNCHRO_ACTIVATION = "SYNCHRO_ACTIVATION";
export const actionSynchronizationActivation = (): Promise<void> => publishAction(new Action(SYNCHRO_ACTIVATION));

export const SYNCHRO_DEACTIVATION = "SYNCHRO_DEACTIVATION";
export const actionSynchronizationDeactivation = (): Promise<void> => publishAction(new Action(SYNCHRO_DEACTIVATION));

export const SYNCHRO_SIGN_OUT = "SYNCHRO_SIGN_OUT";
export const actionSynchroSignOut = (): Promise<void> => publishAction(new Action(SYNCHRO_SIGN_OUT));
