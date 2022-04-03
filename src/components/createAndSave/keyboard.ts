import { actionTrackCopy, actionTrackNew, actionTrackPaste } from "./actions";
import { IState } from "../../stores/state";
import { actionNotificationOpen } from "../../actions/actions";
import { NotificationMessageEnum } from "../../ui/NotificationMessageEnum";

export function track_new_key(e: KeyboardEvent, state: IState | undefined) {
  if (e.ctrlKey && e.key === "n" && state) {
    actionTrackNew();
  }
}

export function copy_key(e: KeyboardEvent, state: IState | undefined) {
  if (e.ctrlKey && e.key === "c" && state) {
    const { track: { title, grid_text } = {} } = state;
    actionTrackCopy({ title, grid_text }).then(() =>
      actionNotificationOpen(NotificationMessageEnum.NOTIFICATION_MESSAGE_SONG_COMPLETED)
    );
  }
}

export function paste_key(e: KeyboardEvent, state: IState | undefined) {
  if (e.ctrlKey && e.key === "v" && state) {
    actionTrackPaste().then(() => actionNotificationOpen(NotificationMessageEnum.NOTIFICATION_MESSAGE_PASTED));
  }
}
