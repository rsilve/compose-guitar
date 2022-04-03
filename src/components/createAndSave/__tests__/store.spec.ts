import { expect } from "@open-wc/testing";
import { MODALS_CLOSE } from "../../../actions/actions";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import { TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "../actions";
import { confirmSaveCallback } from "../store";

describe("track callback", () => {
  const st = stateTest;

  it("new track without save", async () => {
    const state = await confirmSaveCallback(new Action(TRACK_NEW_WITHOUT_SAVE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  it("new track cancel", async () => {
    const state = await confirmSaveCallback(new Action(TRACK_NEW_CANCEL), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  it("new track cancel (modal close", async () => {
    const state = await confirmSaveCallback(new Action(MODALS_CLOSE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });
});
