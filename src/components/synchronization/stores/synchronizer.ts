import { googleApiWrapper } from "./google-api";
import { storage } from "../../../stores/register/gallery_tools";
import { IState, IStateTrack } from "../../../stores/state";

class Synchronizer {
  signIn(): Promise<boolean> {
    return googleApiWrapper.signIn();
  }

  signOut(): void {
    return googleApiWrapper.signOut();
  }

  upload(track: IStateTrack): Promise<IStateTrack> {
    const index = track.id ? storage.getSynchronizedIndex(track.id) : undefined;
    let promise;
    if (index) {
      promise = googleApiWrapper.updateSong(track, index);
    } else {
      promise = googleApiWrapper.saveSong(track);
    }
    return promise.then((id) => storage.addToSynchronizedIndex(track, id));
  }

  download(state: IState): Promise<number> {
    return googleApiWrapper.listFiles().then((values) => {
      let st = { ...state };
      let { synchronization } = st;
      synchronization = { ...synchronization, syncInProgress: undefined, open: undefined };
      st = { ...st, synchronization };
      values.forEach((uploaded) => {
        st = storage.addToGallery(uploaded.track, st);
        storage.addToSynchronizedIndex(uploaded.track, uploaded.id);
      });
      return values.length;
    });
  }

  async remove(id: string): Promise<void> {
    const index = storage.getSynchronizedIndex(id);
    if (index) {
      return googleApiWrapper.delete(index).then(() => {
        storage.removeFromSynchronizedIndex(id);
      });
    }
    return Promise.resolve();
  }
}

export const synchronizer = new Synchronizer();
