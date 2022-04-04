import Action from "./Action";
import { publishAction } from "./publish_action";

export const INIT_APP = "INIT_APP";
export const actionInitApp = (): Promise<void> => publishAction(new Action(INIT_APP));

export interface IPayloadEditor {
  title?: string;
  grid_text?: string;
  updated_at?: string;
}
