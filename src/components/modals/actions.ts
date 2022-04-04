import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

export const MODALS_CLOSE = "MODALS_CLOSE";
export const actionModalsClose = (): void => {
  publishAction(new Action(MODALS_CLOSE));
};
