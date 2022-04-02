import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";
import { IPayloadEditor } from "../../actions/actions";

export const TRACK_EDIT_CANCEL = "TRACK_EDIT_CANCEL";
export const actionTrackEditCancel = (): void => {
  publishAction(new Action(TRACK_EDIT_CANCEL));
};

export const TRACK_EDIT_APPLY = "TRACK_EDIT_APPLY";
export const actionTrackEditApply = (trackPayload: IPayloadEditor): Promise<void> =>
  publishAction(new Action(TRACK_EDIT_APPLY, trackPayload));
