import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";
import { IPayloadEditor } from "../../actions/actions";

export const TRACK_NEW_CANCEL = "TRACK_NEW_CANCEL";
export const actionTrackNewCancel = (): void => {
  publishAction(new Action(TRACK_NEW_CANCEL));
};

export const TRACK_NEW_WITHOUT_SAVE = "TRACK_NEW_WITHOUT_SAVE";
export const actionTrackNewWithoutSave = (): void => {
  publishAction(new Action(TRACK_NEW_WITHOUT_SAVE));
};

export const SAVE_AS_START_AND_NEW = "SAVE_AS_START_AND_NEW";
export const actionSaveAsStartAndNew = (): Promise<void> => publishAction(new Action(SAVE_AS_START_AND_NEW));

export const TRACK_NEW = "TRACK_NEW";
export const actionTrackNew = (): Promise<void> => publishAction(new Action(TRACK_NEW));

export const TRACK_COPY = "TRACK_COPY";
export const actionTrackCopy = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_COPY, trackPayload));

export const TRACK_PASTE = "TRACK_PASTE";
export const actionTrackPaste = (): Promise<void> => publishAction(new Action(TRACK_PASTE));
