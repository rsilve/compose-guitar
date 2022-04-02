import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

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
