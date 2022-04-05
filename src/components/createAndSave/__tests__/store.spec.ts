import { expect } from "@open-wc/testing";
import { stateTest } from "../../../__tests__/TestHelpers";
import { SAVE_AS_START, SAVE_AS_START_AND_NEW, TRACK_NEW, TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "../actions";
import { createAndSaveCallback } from "../store";
import sinon from "sinon";
import { synchronizer } from "../../synchronization/stores/synchronizer";
import { MODALS_CLOSE } from "../../modals/actions";
import Action from "../../../lib/Action";
import { storage } from "../../../lib/gallery_tools";

describe("track callback", () => {
  const st = stateTest;

  it("new track", async () => {
    const state = await createAndSaveCallback(new Action(TRACK_NEW), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.track).not.to.be.undefined;
    expect(state.track?.id).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  it("new track with save needed", async () => {
    const state = await createAndSaveCallback(new Action(TRACK_NEW), {
      ...st,
      track: { ...st.track, updated_at: new Date().toISOString() },
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.true;
  });
  it("new track without save", async () => {
    const state = await createAndSaveCallback(new Action(TRACK_NEW_WITHOUT_SAVE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  it("new track cancel", async () => {
    const state = await createAndSaveCallback(new Action(TRACK_NEW_CANCEL), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  it("new track cancel (modal close", async () => {
    const state = await createAndSaveCallback(new Action(MODALS_CLOSE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  const stub = sinon.stub(synchronizer);

  it("save as start", async () => {
    const state = await createAndSaveCallback(new Action(SAVE_AS_START), { ...st });
    const fromGallery = storage.getFromGallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete state?.confirm_save;
    expect(fromGallery).to.deep.equal(state);
  });

  it("save as start without id", async () => {
    delete st.track?.id;
    const state = await createAndSaveCallback(new Action(SAVE_AS_START), { ...st });
    const fromGallery = storage.getFromGallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete fromGallery?.track?.id;
    delete fromGallery?.track?.saved_at;
    expect(fromGallery).to.deep.equal(st);
  });

  it("save as start and new", async () => {
    const state = await createAndSaveCallback(new Action(SAVE_AS_START_AND_NEW), {
      ...st,
      transpose: 0,
    });
    const fromGallery = storage.getFromGallery(state.track?.id || "");
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete fromGallery?.track?.id;
    delete fromGallery?.track?.saved_at;
    expect(fromGallery).to.deep.equal(st);
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  it("save as start and upload", async () => {
    stub.upload.resolves(st.track);
    const state = await createAndSaveCallback(new Action(SAVE_AS_START), { ...st, synchronization: { enabled: true } });
    const fromGallery = storage.getFromGallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete state?.confirm_save;
    expect(fromGallery).to.deep.equal(state);
    sinon.assert.calledOnce(stub.upload);
  });
});
