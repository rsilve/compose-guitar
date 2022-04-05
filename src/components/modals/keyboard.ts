import { actionModalsClose } from "./actions";

export function close_modal_key(e: KeyboardEvent) {
  if (e.key === "Escape") {
    actionModalsClose();
    e.preventDefault();
  }
}
