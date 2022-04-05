import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";

export const TRANSPOSE_CHANGE = "TRANSPOSE_CHANGE";
export const actionTransposeChange = (transpose: number): Promise<void> =>
  publishAction(new Action(TRANSPOSE_CHANGE, { transpose }));
