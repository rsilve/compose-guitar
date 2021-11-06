import {default_state, IState, IStateTrack, IStateV1} from "../state";
import {uuid} from "../../../tools/uuid";

export function migrate_to_gallery_with_id(): void {
    const list = gallery_list()
    const track_index: Record<string, string> = {}
    list.forEach(title => {
        const state = get_from_gallery(title)
        if (state && state.track) {
            if (!state.track.id) {
                state.track.id = uuid()
            }
            if (state.track.id && state.track.title) {
                localStorage.setItem(state.track.id, JSON.stringify(state))
                track_index[state.track.id] = state.track.title
            }
        }
    })
    localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index))
}

export function exists_in_gallery(title: string, old_title: string | undefined): boolean {
    const index = gallery_list()
        .filter((t) => t !== old_title)
        .map((t) => t.toUpperCase())
        .indexOf(title.toUpperCase())
    return index >= 0
}

export function gallery_list(): string[] {
    const dict = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
    return Object.values(dict)
}

export function gallery_dict(): Record<string, string> {
    return JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
}

export function add_to_gallery(track: IStateTrack, state: IState): void {
    if (track.title) {
        const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
        if (!track.id) {
            track.id = uuid()
        }
        track_index[track.id] = track.title
        localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index))
        localStorage.setItem(track.id, JSON.stringify(state))

        const title = track.title
        const list = gallery_list()
        list.push(title)
        const dict = list.reduce((a, x) => ({...a, [x]: true}), {})
        const uniq = Object.keys(dict)
        localStorage.setItem("_gallery_list_", JSON.stringify(uniq))
        localStorage.setItem(title, JSON.stringify(state))
    }
}

export function migrateFromV1(state: unknown): IState {

    const {version} = state as { version: string }
    if (version) {
        return {...state as IState}
    } else {
        const {track} = state as { track: { title: string | undefined, grid_text: string | undefined } }
        if (track) {
            return {...state as IState}
        } else {
            const st = state as IStateV1
            const result = {...st, track: {title: st.title, grid_text: st.grid_text}}
            delete result.title
            delete result.grid_text
            return result as IState
        }
    }
}

function stateFromString(str: string): IState {
    const state = default_state()
    state.track = undefined
    let parsed = JSON.parse(str || "{}");
    delete parsed.editor_enabled
    parsed = migrateFromV1(parsed)
    return {...state, ...parsed}
}

function hasJsonStructure(str: string | null): boolean {
    if (!str) {
        return false
    }
    try {
        JSON.parse(str);
        return true
    } catch (err) {
        return false;
    }
}

export function get_from_gallery(title: string): IState | null {
    const from_gallery: string | null = localStorage.getItem(title)
    if (from_gallery) {
        const is_json = hasJsonStructure(from_gallery)
        if (is_json) {
            const parsed = stateFromString(from_gallery)
            if (parsed.track) {
                parsed.track.title = parsed.track.title || title
            }
            return parsed
        } else {
            const state = default_state()
            return {...state, track: {grid_text: from_gallery, title: title}};
        }
    }
    return null
}

export function remove_from_gallery(id: string): void {
    const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
    const title = track_index[id]
    delete track_index[id]
    localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index))
    localStorage.removeItem(id)

    const list: string[] = JSON.parse(localStorage.getItem("_gallery_list_") || "[]");
    const index = list.indexOf(title);
    if (index >= 0) {
        list.splice(index, 1);
        localStorage.setItem("_gallery_list_", JSON.stringify(list))
        localStorage.removeItem(title)
    }


}

export function save_last_state(state: IState): void {
    localStorage.setItem("_last_state_", JSON.stringify(state))
}

export function get_last_state(): IState | undefined {
    const last_state_str = localStorage.getItem("_last_state_");
    if (last_state_str) {
        return stateFromString(last_state_str)
    }
    return undefined;
}
