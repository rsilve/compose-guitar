import {SAVE_AS_START, SAVE_AS_START_AND_NEW} from "../../actions/actions";
import {add_to_gallery} from "./gallery_tools";
import {IState} from "../state";
import {uuid} from "../../../tools/uuid";
import {Action} from "../../../actions/Action";

function save(state: IState): void {
    if (state.track && state.track.title) {
        const {track = {}} = state
        const tr = {...track, saved_at: new Date().toISOString()}
        if (!state.track.id) {
            tr.id = uuid()
            state = {...state, track: tr}
        }
        state = {...state, confirm_save: undefined}
        add_to_gallery(tr, state)
    }
}

export function save_as_callback(action: Action, state: IState): Promise<IState> {

    if (action.action_type === SAVE_AS_START) {
        save(state)
    }

    if (action.action_type === SAVE_AS_START_AND_NEW) {
        save(state)
        state = {...state, editor: {}, confirm_save: undefined, transpose: 0}
    }

    return Promise.resolve(state)
}
