import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";
import { IPayloadEditor } from "../../lib/state";

export const TRACK_EDIT_CANCEL = "TRACK_EDIT_CANCEL";
export const actionTrackEditCancel = (): void => {
  publishAction(new Action(TRACK_EDIT_CANCEL));
};

export const TRACK_EDIT_APPLY = "TRACK_EDIT_APPLY";
export const actionTrackEditApply = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_EDIT_APPLY, trackPayload));

export const TRACK_EDIT = "TRACK_EDIT";
export const actionTrackEdit = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_EDIT, trackPayload));
