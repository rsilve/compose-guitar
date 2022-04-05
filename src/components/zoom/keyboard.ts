import { actionZoomChange } from "./actions";
import { IState } from "../../lib/state";

export function decrKey(e: KeyboardEvent, state: IState | undefined) {
  if (e.altKey && (e.key === "—" || e.key === "-") && state) {
    actionZoomChange(state.zoom - 10);
  }
}

export function incrKey(e: KeyboardEvent, state: IState | undefined) {
  if (e.altKey && (e.key === "≠" || e.key === "+") && state) {
    actionZoomChange(state.zoom + 10);
  }
}
