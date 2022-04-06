import { IState } from "../../lib/state";
import { TRANSPOSE_CHANGE } from "./actions";
import Action from "../../lib/Action";

export async function transposeChangeCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === TRANSPOSE_CHANGE) {
    let { transpose } = action.payload as { transpose: number };
    if (!transpose || Number.isNaN(Number(transpose))) {
      transpose = 0;
    }
    transpose = Math.min(12, transpose);
    transpose = Math.max(-12, transpose);
    result = { ...result, transpose };
  }
  return result;
}
