import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";

export const MODALS_CLOSE = "MODALS_CLOSE";
export const actionModalsClose = (): void => {
  publishAction(new Action(MODALS_CLOSE));
};
