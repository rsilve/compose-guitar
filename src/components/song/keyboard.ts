import { IState } from "../../lib/state";
import { actionTrackEdit } from "./actions";

export function editKey(e: KeyboardEvent, state: IState | undefined) {
  if (e.ctrlKey && e.key === "e" && state) {
    const { track = {} } = state;
    actionTrackEdit(track).catch((reason) => console.warn(reason));
  }
}
