import { IStateTrack } from "../lib/state";

export function saveNeeded(track?: IStateTrack): boolean {
  if (!track) {
    return false;
  }
  if (!track.saved_at && track.updated_at) {
    return true;
  }
  try {
    if (track.saved_at && track.updated_at) {
      const d1 = new Date(track.saved_at).getTime();
      const d2 = new Date(track.updated_at).getTime();
      return d1 < d2;
    }
  } catch {
    // ignore
  }

  return false;
}
