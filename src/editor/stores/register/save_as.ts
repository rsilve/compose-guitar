import {SAVE_AS_START, SAVE_AS_START_AND_NEW} from "../../actions/actions";
import {add_to_gallery} from "./gallery_tools";
import {IState, IStateTrack} from "../state";
import {Action} from "../../../actions/Action";

function save(state: IState): IState {
    if (state.track && state.track.title) {
        const {track = {}} = state
        const tr: IStateTrack = {...track, saved_at: new Date().toISOString()}
        state = add_to_gallery(tr, state)
        state = {...state, confirm_save: undefined}
    }
    return state
}

export function save_as_callback(action: Action, state: IState): Promise<IState> {

    if (action.action_type === SAVE_AS_START) {
        state = save(state)
    }

    if (action.action_type === SAVE_AS_START_AND_NEW) {
        state = save(state)
        state = {...state, editor: {}, transpose: 0}
    }

    return Promise.resolve(state)
}
