import {
    action_notification_open,
    IPayloadEditor,
    MODALS_CLOSE, TRACK_COPY,
    TRACK_EDIT,
    TRACK_EDIT_APPLY,
    TRACK_EDIT_CANCEL,
    TRACK_NEW,
    TRACK_NEW_CANCEL,
    TRACK_NEW_WITHOUT_SAVE, TRACK_PASTE
} from "../../actions/actions";
import {IState} from "../state";
import {save_needed} from "../../tools/state_tools";
import {Action} from "../../../actions/Action";
import {uuid} from "../../../tools/uuid";

export function track_callback(action: Action, state: IState): Promise<IState> {

    if (action.action_type === TRACK_NEW) {
        const {track = {}} = state
        if (save_needed(track)) {
            state = {...state, confirm_save: true}
        } else {
            state = {...state, track: {...track, id: undefined}, editor: {}, transpose: 0}
        }
    }

    if (action.action_type === TRACK_NEW_WITHOUT_SAVE) {
        state = {...state, editor: {}, transpose: 0, confirm_save: undefined}
    }

    if (action.action_type === TRACK_NEW_CANCEL || action.action_type === MODALS_CLOSE) {
        state.confirm_save = undefined
        state.editor = undefined
    }

    if (action.action_type === TRACK_EDIT) {
        const {title, grid_text} = action.payload as IPayloadEditor
        state.editor = {title, grid_text}
    }

    if (action.action_type === TRACK_EDIT_CANCEL || action.action_type === MODALS_CLOSE) {
        state.editor = undefined
    }

    if (action.action_type === TRACK_EDIT_APPLY) {
        const {title, grid_text, updated_at} = action.payload as IPayloadEditor
        let {track = {}} = state
        track = {...track, title, grid_text, updated_at}
        if (!track.id) {
            track.id = uuid()
        }
        state = {...state, track, editor: undefined}
        action_notification_open("Track updated")
    }

    if (action.action_type === TRACK_COPY) {
        const {title, grid_text} = action.payload as IPayloadEditor
        return new Promise((resolve) => {
            navigator.clipboard
                .writeText(JSON.stringify({title, grid_text}))
                .then(() => resolve(state))
                .then(() => action_notification_open("Song copied"))
        });
    }

    if (action.action_type === TRACK_PASTE) {
        return new Promise((resolve) => {
            navigator.clipboard
                .readText()
                .then((t) => state.track = JSON.parse(t))
                .then(() => resolve(state))
                .then(() => action_notification_open("Pasted"))
        });
    }

    return Promise.resolve(state)
}
