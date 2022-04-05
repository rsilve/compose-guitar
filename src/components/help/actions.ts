import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";

export const HELP_OPEN = "HELP_OPEN";
export const actionHelpOpen = (): void => {
  publishAction(new Action(HELP_OPEN));
};

export const HELP_CLOSE = "HELP_CLOSE";
export const actionHelpClose = (): void => {
  publishAction(new Action(HELP_CLOSE));
};
