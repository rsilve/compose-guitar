import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";

export const INIT_APP = "INIT_APP";
export const actionInitApp = (): Promise<void> => publishAction(new Action(INIT_APP));
