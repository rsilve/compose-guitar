import { IPayloadEditor, TRACK_COPY, TRACK_NEW, TRACK_PASTE } from "../../actions/actions";
import { IState } from "../state";
import { saveNeeded } from "../../tools/state_tools";
import Action from "../../actions/Action";

export async function trackCallback(action: Action, state: IState): Promise<IState> {
  let result = { ...state };
  if (action.actionType === TRACK_NEW) {
    const { track = {} } = result;
    if (saveNeeded(track)) {
      result = { ...result, confirm_save: true };
    } else {
      result = {
        ...result,
        track: { ...track, id: undefined },
        editor: {},
        transpose: 0,
      };
    }
  }

  if (action.actionType === TRACK_COPY) {
    const { title, grid_text } = action.payload as IPayloadEditor;
    await navigator.clipboard.writeText(JSON.stringify({ title, grid_text }));
  }

  if (action.actionType === TRACK_PASTE) {
    await navigator.clipboard.readText().then((t) => {
      result.track = JSON.parse(t);
    });
  }

  return Promise.resolve(result);
}
