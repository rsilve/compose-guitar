import { default_state, IGalleryTrack, IState, IStateTrack } from "../state";
import { uuid } from "../../tools/uuid";

export function gallery_list(): string[] {
  const dict = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
  return Object.values(dict);
}

export function exists_in_gallery(title: string, old_title: string | undefined): boolean {
  const index = gallery_list()
    .filter((t) => t !== old_title)
    .map((t) => t.toUpperCase())
    .indexOf(title.toUpperCase());
  return index >= 0;
}

export function gallery_dict(): Record<string, string> {
  return JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
}

export function add_to_gallery(track: IStateTrack, state: IState): IState {
  let newState = { ...state };
  const newTrack = { ...track };
  if (newTrack.title) {
    const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
    if (!newTrack.id) {
      newTrack.id = uuid();
    }
    track_index[newTrack.id] = newTrack.title;
    newState = { ...newState, track: newTrack };
    localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index));
    localStorage.setItem(newTrack.id, JSON.stringify(newState));
  }
  return newState;
}

function parseSynchronizedIndexDict() {
  const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_synchronized_") || "{}");
  return track_index;
}

export function get_synchronized_index(id: string): string | undefined {
  const track_index: Record<string, string> = parseSynchronizedIndexDict();
  return track_index[id];
}

export function add_to_synchronized_index(track: IStateTrack, id: string): IStateTrack {
  if (!track.id) {
    track.id = uuid();
  }
  const track_index = parseSynchronizedIndexDict();
  track_index[track.id] = id;
  localStorage.setItem("_gallery_list_synchronized_", JSON.stringify(track_index));
  return track;
}

export function remove_from_synchronized_index(trackId: string): void {
  const track_index: Record<string, string> = parseSynchronizedIndexDict();
  delete track_index[trackId];
  localStorage.setItem("_gallery_list_synchronized_", JSON.stringify(track_index));
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

export function getFromGallery(id: string): IState | null {
  const fromGallery: string | null = localStorage.getItem(id);
  if (fromGallery) {
    const isJson = hasJsonStructure(fromGallery);
    if (isJson) {
      const parsed = stateFromString(fromGallery);
      if (parsed.track) {
        parsed.track.title = parsed.track.title || id;
      }
      return parsed;
    }
    const state = default_state();
    return { ...state, track: { grid_text: fromGallery, title: id } };
  }
  return null;
}

export function removeFromGallery(id: string): void {
  const track_index: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
  delete track_index[id];
  localStorage.setItem("_gallery_list_dict_", JSON.stringify(track_index));
  localStorage.removeItem(id);
}

export function saveLastState(state: IState): void {
  localStorage.setItem("_last_state_", JSON.stringify(state));
}

export function get_last_state(): IState | undefined {
  const last_state_str = localStorage.getItem("_last_state_");
  if (last_state_str) {
    return stateFromString(last_state_str);
  }
  return undefined;
}

export function gallery_dict_extended(): Record<string, IGalleryTrack> {
  const res: Record<string, IGalleryTrack> = {};
  const localDict = gallery_dict();
  const synchronizedDict = parseSynchronizedIndexDict();
  Object.keys(localDict).forEach((key) => {
    res[key] = { title: localDict[key], synchronized: !!synchronizedDict[key] };
  });
  return res;
}
