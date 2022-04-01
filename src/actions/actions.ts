import Action from "./Action";
import { publishAction } from "./publish_action";
import { NotificationMessageEnum } from "../ui/NotificationMessageEnum";

export const INIT_APP = "INIT_APP";
export const actionInitApp = (): Promise<void> => publishAction(new Action(INIT_APP));

export const UPLOAD_FROM_GALLERY = "UPLOAD_FROM_GALLERY";
export const actionUploadFromGallery = (id: string): Promise<void> =>
  publishAction(new Action(UPLOAD_FROM_GALLERY, { id }));

export const SAVE_AS_START = "SAVE_AS_START";
export const actionSaveAsStart = (): Promise<void> => publishAction(new Action(SAVE_AS_START));

export const SAVE_AS_START_AND_NEW = "SAVE_AS_START_AND_NEW";
export const actionSaveAsStartAndNew = (): Promise<void> => publishAction(new Action(SAVE_AS_START_AND_NEW));

export const GALLERY_OPEN = "GALLERY_OPEN";
export const actionGalleryOpen = (): void => {
  publishAction(new Action(GALLERY_OPEN));
};

export const GALLERY_REMOVE = "GALLERY_REMOVE";
export const actionGalleryRemove = (id: string): void => {
  publishAction(new Action(GALLERY_REMOVE, { id }));
};

export const GALLERY_CLOSE = "GALLERY_CLOSE";
export const actionGalleryClose = (): void => {
  publishAction(new Action(GALLERY_CLOSE));
};

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

export const TRACK_NEW = "TRACK_NEW";
export const actionTrackNew = (): Promise<void> => publishAction(new Action(TRACK_NEW));

export const TRACK_NEW_WITHOUT_SAVE = "TRACK_NEW_WITHOUT_SAVE";
export const actionTrackNewWithoutSave = (): void => {
  publishAction(new Action(TRACK_NEW_WITHOUT_SAVE));
};

export const TRACK_NEW_CANCEL = "TRACK_NEW_CANCEL";
export const actionTrackNewCancel = (): void => {
  publishAction(new Action(TRACK_NEW_CANCEL));
};

export const TRACK_EDIT = "TRACK_EDIT";
export const actionTrackEdit = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_EDIT, trackPayload));

export const TRACK_EDIT_CANCEL = "TRACK_EDIT_CANCEL";
export const actionTrackEditCancel = (): void => {
  publishAction(new Action(TRACK_EDIT_CANCEL));
};

export const TRACK_EDIT_APPLY = "TRACK_EDIT_APPLY";
export const actionTrackEditApply = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_EDIT_APPLY, trackPayload));

export const TRACK_COPY = "TRACK_COPY";
export const actionTrackCopy = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_COPY, trackPayload));

export const TRACK_PASTE = "TRACK_PASTE";
export const actionTrackPaste = (): Promise<void> => publishAction(new Action(TRACK_PASTE));

export const HELP_OPEN = "HELP_OPEN";
export const actionHelpOpen = (): void => {
  publishAction(new Action(HELP_OPEN));
};

export const HELP_CLOSE = "HELP_CLOSE";
export const actionHelpClose = (): void => {
  publishAction(new Action(HELP_CLOSE));
};

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

export const SYNCHRO_ACTIVATION = "SYNCHRO_ACTIVATION";
export const actionSynchronizationActivation = (): Promise<void> => publishAction(new Action(SYNCHRO_ACTIVATION));

export const SYNCHRO_DEACTIVATION = "SYNCHRO_DEACTIVATION";
export const actionSynchronizationDeactivation = (): Promise<void> => publishAction(new Action(SYNCHRO_DEACTIVATION));

export const SYNCHRO_CONFIGURATION_CLOSE = "SYNCHRO_CONFIGURATION_CLOSE";
export const actionSynchronizationConfigurationClose = (): Promise<void> =>
  publishAction(new Action(SYNCHRO_CONFIGURATION_CLOSE));

export const SYNCHRO_SIGN_IN = "SYNCHRO_SIGN_IN";
export const actionSynchroSignIn = (): Promise<void> => publishAction(new Action(SYNCHRO_SIGN_IN));

export const SYNCHRO_SIGN_OUT = "SYNCHRO_SIGN_OUT";
export const actionSynchroSignOut = (): Promise<void> => publishAction(new Action(SYNCHRO_SIGN_OUT));

export const SYNCHRO_FORCE_START = "SYNCHRO_FORCE_START";
export const actionSynchroForceStart = (): Promise<void> => publishAction(new Action(SYNCHRO_FORCE_START));

export const SYNCHRO_FORCE = "SYNCHRO_FORCE";
export const actionSynchroForce = (): Promise<void> => publishAction(new Action(SYNCHRO_FORCE));

export const SYNCHRO_TOGGLE_ENABLED = "SYNCHRO_TOGGLE_ENABLED";
export const actionSynchroToggleEnable = (): Promise<void> => publishAction(new Action(SYNCHRO_TOGGLE_ENABLED));
