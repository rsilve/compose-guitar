import {IState, STATE_VERSION} from "../editor/stores/state";

export const state_test: IState = {
    version: STATE_VERSION,
    track: {
        title: "title",
        grid_text: "Em7 | A7",
        id: "unique_id"
    },
    zoom: 100,
    transpose: 0,
    synchronization: {
        enabled: false
    }
}