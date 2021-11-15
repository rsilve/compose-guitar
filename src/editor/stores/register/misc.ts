import {INIT_APP, TRANSPOSE_CHANGE, ZOOM_CHANGE} from "../../actions/actions";
import {get_last_state} from "./gallery_tools";
import {IState} from "../state";
import {Action} from "../../../actions/Action";

export function init_app_callback(action: Action, state: IState): Promise<IState> {
    if (action.action_type === INIT_APP) {
        const st = get_last_state()
        if (st) {
            state = {...state, ...st}
        }
    }

    return Promise.resolve(state)
}

export function zoom_change_callback(action: Action, state: IState): Promise<IState> {
    if (action.action_type === ZOOM_CHANGE) {
        let {zoom} = action.payload as { zoom: number }
        if (isNaN(zoom)) {
            zoom = 100
        }
        zoom = Math.min(200, zoom)
        zoom = Math.max(10, zoom)
        state = {...state, zoom: zoom};
    }
    return Promise.resolve(state)
}

export function transpose_change_callback(action: Action, state: IState): Promise<IState> {
    if (action.action_type === TRANSPOSE_CHANGE) {
        let {transpose} = action.payload as { transpose: number }
        if (isNaN(transpose)) {
            transpose = 0
        }
        transpose = Math.min(12, transpose)
        transpose = Math.max(-12, transpose)
        state = {...state, transpose: transpose};
    }
    return Promise.resolve(state)
}

