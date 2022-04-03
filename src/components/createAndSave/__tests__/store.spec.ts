import { expect } from "@open-wc/testing";
import { MODALS_CLOSE } from "../../../actions/actions";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import { TRACK_NEW, TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "../actions";
import { createAndSaveCallback } from "../store";

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
});
