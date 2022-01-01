import { IState, IStateTrack } from "../state";
import { add_to_gallery, add_to_synchronized_index, get_synchronized_index } from "./gallery_tools";
import { googleApiWrapper } from "./google-api";

class Synchronizer {
  signIn(): Promise<boolean> {
    return googleApiWrapper.signIn();
  }
  signOut(): void {
    return googleApiWrapper.signOut();
  }
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

  download(state: IState): Promise<void> {
    return googleApiWrapper.listFiles().then((values) => {
      let st = { ...state };
      let { synchronization } = st;
      synchronization = { ...synchronization, syncInProgress: undefined, open: undefined };
      st = { ...st, synchronization };
      values.forEach((uploaded) => {
        st = add_to_gallery(uploaded.track, st);
        add_to_synchronized_index(uploaded.track, uploaded.id);
      });
    });
  }
}

export const synchronizer = new Synchronizer();