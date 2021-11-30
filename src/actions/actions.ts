import Action from "./Action";
import { publish_action } from "./publish_action";

export const INIT_APP = "INIT_APP";
export const action_init_app = (): Promise<void> => publish_action(new Action(INIT_APP));

export const UPLOAD_FROM_GALLERY = "UPLOAD_FROM_GALLERY";
export const action_upload_from_gallery = (id: string): void => {
  publish_action(new Action(UPLOAD_FROM_GALLERY, { id }));
};

export const SAVE_AS_START = "SAVE_AS_START";
export const action_save_as_start = (): Promise<void> => publish_action(new Action(SAVE_AS_START));

export const SAVE_AS_START_AND_NEW = "SAVE_AS_START_AND_NEW";
export const action_save_as_start_and_new = (): Promise<void> => publish_action(new Action(SAVE_AS_START_AND_NEW));

export const GALLERY_OPEN = "GALLERY_OPEN";
export const action_gallery_open = (): void => {
  publish_action(new Action(GALLERY_OPEN));
};

export const GALLERY_REMOVE = "GALLERY_REMOVE";
export const action_gallery_remove = (id: string): void => {
  publish_action(new Action(GALLERY_REMOVE, { id }));
};

export const GALLERY_CLOSE = "GALLERY_CLOSE";
export const action_gallery_close = (): void => {
  publish_action(new Action(GALLERY_CLOSE));
};

export const NOTIFICATION_OPEN = "NOTIFICATION_OPEN";
export const action_notification_open = (message: string): void => {
  setTimeout(() => {
    publish_action(new Action(NOTIFICATION_OPEN, { message }));
  }, 100);
};

export const NOTIFICATION_CLOSE = "NOTIFICATION_CLOSE";
export const action_notification_close = (): void => {
  publish_action(new Action(NOTIFICATION_CLOSE));
};

export const ZOOM_CHANGE = "ZOOM_CHANGE";
export const action_zoom_change = (zoom: number): void => {
  publish_action(new Action(ZOOM_CHANGE, { zoom }));
};

export const TRANSPOSE_CHANGE = "TRANSPOSE_CHANGE";
export const action_transpose_change = (transpose: number): Promise<void> =>
  publish_action(new Action(TRANSPOSE_CHANGE, { transpose }));

export interface IPayloadEditor {
  title?: string;
  grid_text?: string;
  updated_at?: string;
}

export const TRACK_NEW = "TRACK_NEW";
export const action_track_new = (): Promise<void> => publish_action(new Action(TRACK_NEW));

export const TRACK_NEW_WITHOUT_SAVE = "TRACK_NEW_WITHOUT_SAVE";
export const action_track_new_without_save = (): void => {
  publish_action(new Action(TRACK_NEW_WITHOUT_SAVE));
};

export const TRACK_NEW_CANCEL = "TRACK_NEW_CANCEL";
export const action_track_new_cancel = (): void => {
  publish_action(new Action(TRACK_NEW_CANCEL));
};

export const TRACK_EDIT = "TRACK_EDIT";
export const action_track_edit = (track_payload: IPayloadEditor): Promise<void> =>
  publish_action(new Action(TRACK_EDIT, track_payload));

export const TRACK_EDIT_CANCEL = "TRACK_EDIT_CANCEL";
export const action_track_edit_cancel = (): void => {
  publish_action(new Action(TRACK_EDIT_CANCEL));
};

export const TRACK_EDIT_APPLY = "TRACK_EDIT_APPLY";
export const action_track_edit_apply = (track_payload: IPayloadEditor): Promise<void> =>
  publish_action(new Action(TRACK_EDIT_APPLY, track_payload));

export const TRACK_COPY = "TRACK_COPY";
export const action_track_copy = (track_payload: IPayloadEditor): Promise<void> =>
  publish_action(new Action(TRACK_COPY, track_payload));

export const TRACK_PASTE = "TRACK_PASTE";
export const action_track_paste = (): Promise<void> => publish_action(new Action(TRACK_PASTE));

export const HELP_OPEN = "HELP_OPEN";
export const action_help_open = (): void => {
  publish_action(new Action(HELP_OPEN));
};

export const HELP_CLOSE = "HELP_CLOSE";
export const action_help_close = (): void => {
  publish_action(new Action(HELP_CLOSE));
};

export const MODALS_CLOSE = "MODALS_CLOSE";
export const action_modals_close = (): void => {
  publish_action(new Action(MODALS_CLOSE));
};

export const SYNCHRO_ACTIVATION_REQUEST = "SYNCHRO_ACTIVATION_REQUEST";
export const action_synchronization_activation_request = (): Promise<void> =>
  publish_action(new Action(SYNCHRO_ACTIVATION_REQUEST));

export const SYNCHRO_DEACTIVATION_REQUEST = "SYNCHRO_DEACTIVATION_REQUEST";
export const action_synchronization_deactivation_request = (): Promise<void> =>
  publish_action(new Action(SYNCHRO_DEACTIVATION_REQUEST));

export const SYNCHRO_ACTIVATION = "SYNCHRO_ACTIVATION";
export const action_synchronization_activation = (): Promise<void> => publish_action(new Action(SYNCHRO_ACTIVATION));

export const SYNCHRO_DEACTIVATION = "SYNCHRO_DEACTIVATION";
export const action_synchronization_deactivation = (): Promise<void> =>
  publish_action(new Action(SYNCHRO_DEACTIVATION));

export const SYNCHRO_CONFIGURATION_CLOSE = "SYNCHRO_CONFIGURATION_CLOSE";
export const action_synchronization_configuration_close = (): Promise<void> =>
  publish_action(new Action(SYNCHRO_CONFIGURATION_CLOSE));

export const SYNCHRO_SIGN_IN = "SYNCHRO_SIGN_IN";
export const action_synchro_sign_in = (): Promise<void> => publish_action(new Action(SYNCHRO_SIGN_IN));

export const SYNCHRO_SIGN_OUT = "SYNCHRO_SIGN_OUT";
export const action_synchro_sign_out = (): Promise<void> => publish_action(new Action(SYNCHRO_SIGN_OUT));
