import { default_state, IGalleryTrack, IState, IStateTrack } from "../state";
import { uuid } from "../../tools/uuid";

export function galleryList(): string[] {
  const dict = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
  return Object.values(dict);
}

export function existsInGallery(title: string, oldTitle: string | undefined): boolean {
  const index = galleryList()
    .filter((t) => t !== oldTitle)
    .map((t) => t.toUpperCase())
    .indexOf(title.toUpperCase());
  return index >= 0;
}

export function galleryDict(): Record<string, string> {
  return JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
}

export function addToGallery(track: IStateTrack, state: IState): IState {
  let newState = { ...state };
  const newTrack = { ...track };
  if (newTrack.title) {
    const trackIndex: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
    if (!newTrack.id) {
      newTrack.id = uuid();
    }
    trackIndex[newTrack.id] = newTrack.title;
    newState = { ...newState, track: newTrack };
    localStorage.setItem("_gallery_list_dict_", JSON.stringify(trackIndex));
    localStorage.setItem(newTrack.id, JSON.stringify(newState));
  }
  return newState;
}

function parseSynchronizedIndexDict() {
  const trackIndex: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_synchronized_") || "{}");
  return trackIndex;
}

export function getSynchronizedIndex(id: string): string | undefined {
  const trackIndex: Record<string, string> = parseSynchronizedIndexDict();
  return trackIndex[id];
}

export function addToSynchronizedIndex(track: IStateTrack, id: string): IStateTrack {
  if (!track.id) {
    track.id = uuid();
  }
  const trackIndex = parseSynchronizedIndexDict();
  trackIndex[track.id] = id;
  localStorage.setItem("_gallery_list_synchronized_", JSON.stringify(trackIndex));
  return track;
}

export function removeFromSynchronizedIndex(trackId: string): void {
  const trackIndex: Record<string, string> = parseSynchronizedIndexDict();
  delete trackIndex[trackId];
  localStorage.setItem("_gallery_list_synchronized_", JSON.stringify(trackIndex));
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
  const trackIndex: Record<string, string> = JSON.parse(localStorage.getItem("_gallery_list_dict_") || "{}");
  delete trackIndex[id];
  localStorage.setItem("_gallery_list_dict_", JSON.stringify(trackIndex));
  localStorage.removeItem(id);
}

export function saveLastState(state: IState): void {
  localStorage.setItem("_last_state_", JSON.stringify(state));
}

export function getLastState(): IState | undefined {
  const lastStateStr = localStorage.getItem("_last_state_");
  if (lastStateStr) {
    return stateFromString(lastStateStr);
  }
  return undefined;
}

export function galleryDictExtended(): Record<string, IGalleryTrack> {
  const res: Record<string, IGalleryTrack> = {};
  const localDict = galleryDict();
  const synchronizedDict = parseSynchronizedIndexDict();
  Object.keys(localDict).forEach((key) => {
    res[key] = { title: localDict[key], synchronized: !!synchronizedDict[key] };
  });
  return res;
}

export const storage = {
  getFromGallery,
  removeFromGallery,
  addToGallery,
  addToSynchronizedIndex,
  removeFromSynchronizedIndex,
  getSynchronizedIndex,
  galleryDictExtended,
  getLastState,
  saveLastState,
};
