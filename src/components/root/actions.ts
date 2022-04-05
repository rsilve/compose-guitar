import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

export const INIT_APP = "INIT_APP";
export const actionInitApp = (): Promise<void> => publishAction(new Action(INIT_APP));
