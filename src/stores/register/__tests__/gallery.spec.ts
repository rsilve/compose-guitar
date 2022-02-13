import { expect } from "@open-wc/testing";
import { GALLERY_CLOSE, GALLERY_OPEN, GALLERY_REMOVE } from "../../../actions/actions";
import { addToGallery, addToSynchronizedIndex, getFromGallery, getSynchronizedIndex } from "../gallery_tools";
import { galleryCallback } from "../gallery";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import sinon from "sinon";
import { googleApiWrapper } from "../google-api";

suite("Gallery callback", () => {
  const st = stateTest;
  const stub = sinon.stub(googleApiWrapper);

  test("gallery open", async () => {
    const state = await galleryCallback(new Action(GALLERY_OPEN), { ...st });
    expect(state.gallery).to.be.true;
  });

  test("remove from gallery", async () => {
    let { track = {} } = st;
    track = { ...track, grid_text: "aa" };
    addToGallery(track, { ...st, track });
    const state = await galleryCallback(new Action(GALLERY_REMOVE, { id: track.id }), { ...st });
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
    stateSync = addToGallery(track, { ...stateSync, track });
    track = stateSync.track || {};
    addToSynchronizedIndex(track, "remote_index");
    const state = await galleryCallback(new Action(GALLERY_REMOVE, { id: track.id }), stateSync);
    expect(state.gallery).to.be.undefined;
    expect(state).to.deep.equal(stateSync);
    const fromGallery = getFromGallery("test1");
    expect(fromGallery).to.be.null;
    const fromGalleryById = getFromGallery(track.id || "");
    expect(fromGalleryById).to.be.null;
    const id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.undefined;
  });

  test("gallery close", async () => {
    const state = await galleryCallback(new Action(GALLERY_CLOSE), { ...st });
    expect(state.gallery).to.be.undefined;
  });
});
