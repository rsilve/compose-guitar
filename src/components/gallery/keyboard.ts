import { actionGalleryOpen } from "./actions";
import { IState } from "../../lib/state";

export function openKey(e: KeyboardEvent, state: IState | undefined): void {
  if (e.ctrlKey && e.key === "l" && state) {
    actionGalleryOpen();
    e.preventDefault();
  }
}
