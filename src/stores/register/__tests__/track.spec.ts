import { expect } from "@open-wc/testing";
import { TRACK_NEW } from "../../../actions/actions";
import { stateTest } from "../../../__tests__/TestHelpers";
import { trackCallback } from "../track";
import Action from "../../../actions/Action";

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
});
