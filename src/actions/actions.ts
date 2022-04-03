import Action from "./Action";
import { publishAction } from "./publish_action";
import { NotificationMessageEnum } from "../ui/NotificationMessageEnum";

export const INIT_APP = "INIT_APP";
export const actionInitApp = (): Promise<void> => publishAction(new Action(INIT_APP));

export const NOTIFICATION_OPEN = "NOTIFICATION_OPEN";
export const actionNotificationOpen = (message: NotificationMessageEnum): void => {
  setTimeout(() => {
    publishAction(new Action(NOTIFICATION_OPEN, { message }));
  }, 100);
};

export const NOTIFICATION_CLOSE = "NOTIFICATION_CLOSE";
export const actionNotificationClose = (): void => {
  publishAction(new Action(NOTIFICATION_CLOSE));
};

export interface IPayloadEditor {
  title?: string;
  grid_text?: string;
  updated_at?: string;
}

export const MODALS_CLOSE = "MODALS_CLOSE";
export const actionModalsClose = (): void => {
  publishAction(new Action(MODALS_CLOSE));
};

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
