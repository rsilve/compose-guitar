import { expect } from "@open-wc/testing";
import { SAVE_AS_START, SAVE_AS_START_AND_NEW } from "../../../actions/actions";
import { saveAsCallback } from "../save_as";
import { getFromGallery } from "../gallery_tools";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import sinon from "sinon";
import { synchronizer } from "../synchronizer";

describe("Register save_as", () => {
  const st = stateTest;
  const stub = sinon.stub(synchronizer);

  it("save as start", async () => {
    const state = await saveAsCallback(new Action(SAVE_AS_START), { ...st });
    const fromGallery = getFromGallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete state?.confirm_save;
    expect(fromGallery).to.deep.equal(state);
  });

  it("save as start without id", async () => {
    delete st.track?.id;
    const state = await saveAsCallback(new Action(SAVE_AS_START), { ...st });
    const fromGallery = getFromGallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete fromGallery?.track?.id;
    delete fromGallery?.track?.saved_at;
    expect(fromGallery).to.deep.equal(st);
  });

  it("save as start and new", async () => {
    const state = await saveAsCallback(new Action(SAVE_AS_START_AND_NEW), {
      ...st,
      transpose: 0,
    });
    const fromGallery = getFromGallery(state.track?.id || "");
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
    const state = await saveAsCallback(new Action(SAVE_AS_START), { ...st, synchronization: { enabled: true } });
    const fromGallery = getFromGallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete state?.confirm_save;
    expect(fromGallery).to.deep.equal(state);
    sinon.assert.calledOnce(stub.upload);
  });
});
