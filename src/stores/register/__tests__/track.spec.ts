import { expect } from "@open-wc/testing";
import { MODALS_CLOSE, TRACK_EDIT, TRACK_NEW } from "../../../actions/actions";
import { stateTest } from "../../../__tests__/TestHelpers";
import { trackCallback } from "../track";
import Action from "../../../actions/Action";
import { TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "../../../components/confirmSave/actions";

describe("track callback", () => {
  const st = stateTest;

  it("new track", async () => {
    const state = await trackCallback(new Action(TRACK_NEW), {
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
    const state = await trackCallback(new Action(TRACK_NEW), {
      ...st,
      track: { ...st.track, updated_at: new Date().toISOString() },
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.true;
  });

  it("new track without save", async () => {
    const state = await trackCallback(new Action(TRACK_NEW_WITHOUT_SAVE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  it("new track cancel", async () => {
    const state = await trackCallback(new Action(TRACK_NEW_CANCEL), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  it("new track cancel (modal close", async () => {
    const state = await trackCallback(new Action(MODALS_CLOSE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  it("edit track", async () => {
    const { track = {} } = st;
    const payload = { title: track.title, grid_text: track.grid_text };
    const state = await trackCallback(new Action(TRACK_EDIT, payload), {
      ...st,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.editor).to.deep.equal(payload);
  });
});
