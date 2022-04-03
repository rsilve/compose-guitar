import { actionTrackNew } from "./actions";
import { IState } from "../../stores/state";

export function track_new_key(e: KeyboardEvent, state: IState | undefined) {
  if (e.ctrlKey && e.key === "n" && state) {
    actionTrackNew();
  }
}
