import { IStateTrack } from "../state";
import { add_to_synchronized_index, get_synchronized_index } from "./gallery_tools";
import { googleApiWrapper } from "./google-api";

class Synchronizer {
  upload(track: IStateTrack): Promise<IStateTrack> {
    const index = get_synchronized_index(track);
    let promise;
    if (index) {
      promise = googleApiWrapper.updateSong(track, index);
    } else {
      promise = googleApiWrapper.saveSong(track);
    }
    return promise.then((id) => add_to_synchronized_index(track, id));
  }
}

export const synchronizer = new Synchronizer();
