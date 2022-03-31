import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

export const TRANSPOSE_CHANGE = "TRANSPOSE_CHANGE";
export const actionTransposeChange = (transpose: number): Promise<void> =>
  publishAction(new Action(TRANSPOSE_CHANGE, { transpose }));
