import { IState, IStateTrack } from "../state";
import {
  addToGallery,
  addToSynchronizedIndex,
  getSynchronizedIndex,
  removeFromSynchronizedIndex,
} from "./gallery_tools";
import { googleApiWrapper } from "./google-api";

class Synchronizer {
  signIn(): Promise<boolean> {
    return googleApiWrapper.signIn();
  }

  signOut(): void {
    return googleApiWrapper.signOut();
  }

  upload(track: IStateTrack): Promise<IStateTrack> {
    const index = track.id ? getSynchronizedIndex(track.id) : undefined;
    let promise;
    if (index) {
      promise = googleApiWrapper.updateSong(track, index);
    } else {
      promise = googleApiWrapper.saveSong(track);
    }
    return promise.then((id) => addToSynchronizedIndex(track, id));
  }

  download(state: IState): Promise<number> {
    return googleApiWrapper.listFiles().then((values) => {
      let st = { ...state };
      let { synchronization } = st;
      synchronization = { ...synchronization, syncInProgress: undefined, open: undefined };
      st = { ...st, synchronization };
      values.forEach((uploaded) => {
        st = addToGallery(uploaded.track, st);
        addToSynchronizedIndex(uploaded.track, uploaded.id);
      });
      return values.length;
    });
  }

  async remove(id: string): Promise<void> {
    const index = getSynchronizedIndex(id);
    if (index) {
      return googleApiWrapper.delete(index).then(() => {
        removeFromSynchronizedIndex(id);
      });
    }
    return Promise.resolve();
  }
}

export const synchronizer = new Synchronizer();
