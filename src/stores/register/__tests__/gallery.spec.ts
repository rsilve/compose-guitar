import { expect } from "@open-wc/testing";
import { GALLERY_CLOSE, GALLERY_OPEN, GALLERY_REMOVE } from "../../../actions/actions";
import { add_to_gallery, add_to_synchronized_index, getFromGallery, get_synchronized_index } from "../gallery_tools";
import { gallery_callback } from "../gallery";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import sinon from "sinon";
import { googleApiWrapper } from "../google-api";

suite("Gallery callback", () => {
  const st = stateTest;
  const stub = sinon.stub(googleApiWrapper);

  test("gallery open", async () => {
    const state = await gallery_callback(new Action(GALLERY_OPEN), { ...st });
    expect(state.gallery).to.be.true;
  });

  test("remove from gallery", async () => {
    let { track = {} } = st;
    track = { ...track, grid_text: "aa" };
    add_to_gallery(track, { ...st, track });
    const state = await gallery_callback(new Action(GALLERY_REMOVE, { id: track.id }), { ...st });
    expect(state.gallery).to.be.undefined;
    expect(state).to.deep.equal(st);
    const fromGallery = getFromGallery("test1");
    expect(fromGallery).to.be.null;
    const fromGalleryById = getFromGallery(track.id || "");
    expect(fromGalleryById).to.be.null;
  });

  test("remove from gallery with sync", async () => {
    stub.delete.returns(Promise.resolve());
    let stateSync = {
      ...st,
      synchronization: { enabled: true },
    };
    let { track = {} } = stateSync;
    track = { ...track, grid_text: "aa" };
    stateSync = add_to_gallery(track, { ...stateSync, track });
    track = stateSync.track || {};
    add_to_synchronized_index(track, "remote_index");
    const state = await gallery_callback(new Action(GALLERY_REMOVE, { id: track.id }), stateSync);
    expect(state.gallery).to.be.undefined;
    expect(state).to.deep.equal(stateSync);
    const fromGallery = getFromGallery("test1");
    expect(fromGallery).to.be.null;
    const fromGalleryById = getFromGallery(track.id || "");
    expect(fromGalleryById).to.be.null;
    const id = get_synchronized_index(track.id || "undef");
    expect(id).to.be.undefined;
  });

  test("gallery close", async () => {
    const state = await gallery_callback(new Action(GALLERY_CLOSE), { ...st });
    expect(state.gallery).to.be.undefined;
  });
});
