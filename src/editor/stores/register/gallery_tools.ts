import { default_state, IState, IStateTrack } from "../state";
import { uuid } from "../../../tools/uuid";

export function exists_in_gallery(title: string, old_title: string | undefined): boolean {
  const index = gallery_list()
    .filter((t) => t !== old_title)
    .map((t) => t.toUpperCase())
    .indexOf(title.toUpperCase());
  return index >= 0;
}

export function gallery_list(): string[] {
  const dict = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
  return Object.values(dict);
}

export function gallery_dict(): Record<string, string> {
  return JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
}

export function add_to_gallery(track: IStateTrack, state: IState): IState {
  if (track.title) {
    const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
    if (!track.id) {
      track.id = uuid();
    }
    track_index[track.id] = track.title;
    state = { ...state, track };
    localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index));
    localStorage.setItem(track.id, JSON.stringify(state));
  }
  return state;
}

function stateFromString(str: string): IState {
  const state = default_state();
  state.track = undefined;
  const parsed = JSON.parse(str || "{}");
  delete parsed.editor_enabled;
  return { ...state, ...parsed };
}

function hasJsonStructure(str: string | null): boolean {
  if (!str) {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
}

export function get_from_gallery(id: string): IState | null {
  const from_gallery: string | null = localStorage.getItem(id);
  if (from_gallery) {
    const is_json = hasJsonStructure(from_gallery);
    if (is_json) {
      const parsed = stateFromString(from_gallery);
      if (parsed.track) {
        parsed.track.title = parsed.track.title || id;
      }
      return parsed;
    }
    const state = default_state();
    return { ...state, track: { grid_text: from_gallery, title: id } };
  }
  return null;
}

export function remove_from_gallery(id: string): void {
  const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
  delete track_index[id];
  localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index));
  localStorage.removeItem(id);
}

export function save_last_state(state: IState): void {
  localStorage.setItem("_last_state_", JSON.stringify(state));
}

export function get_last_state(): IState | undefined {
  const last_state_str = localStorage.getItem("_last_state_");
  if (last_state_str) {
    return stateFromString(last_state_str);
  }
  return undefined;
}
