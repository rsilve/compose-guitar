import {SYNCHRO_ACTIVATION_REQUEST} from "../../actions/actions";
import {IState} from "../state";
import {Action} from "../../../actions/Action";

export function synchronize_callback(action: Action, state: IState): Promise<IState> {
    if (action.action_type === SYNCHRO_ACTIVATION_REQUEST) {
        const {synchronization} = state
        const sync = {...synchronization, open: true}
        state = {...state, synchronization: sync}
    }
    return Promise.resolve(state)
}
