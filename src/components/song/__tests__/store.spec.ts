import { stateTest } from "../../../__tests__/TestHelpers";
import { TRACK_EDIT, TRACK_EDIT_APPLY, TRACK_EDIT_CANCEL } from "../actions";
import { expect } from "@open-wc/testing";
import { songEditCallback } from "../store";
import Action from "../../../lib/Action";

describe("track callback", () => {
  const st = stateTest;

  it("cancel track edition", async () => {
    const { track = {} } = st;
    const state = await songEditCallback(new Action(TRACK_EDIT_CANCEL), {
      ...st,
    });
    expect(state.editor).to.be.undefined;
    expect(state.track).to.deep.equal(track);
  });

  it("apply track edition", async () => {
    const { track = {} } = st;
    const payload = {
      title: "new title",
      grid_text: "new grid",
      updated_at: "now",
    };
    const state = await songEditCallback(new Action(TRACK_EDIT_APPLY, payload), {
      ...st,
    });
    expect(state.editor).to.be.undefined;
    expect(state.track).to.deep.equal({ ...track, ...payload });
  });

  it("apply track edition without track id", async () => {
    const { track = {} } = st;
    delete track.id;
    const payload = {
      title: "new title",
      grid_text: "new grid",
      updated_at: "now",
    };
    const state = await songEditCallback(new Action(TRACK_EDIT_APPLY, payload), {
      ...st,
    });
    expect(state.editor).to.be.undefined;
    expect(state.track?.id).to.not.be.null;
    delete state.track?.id;
    expect(state.track).to.deep.equal({ ...track, ...payload });
  });

  it("edit track", async () => {
    const { track = {} } = st;
    const payload = { title: track.title, grid_text: track.grid_text };
    const state = await songEditCallback(new Action(TRACK_EDIT, payload), {
      ...st,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.editor).to.deep.equal(payload);
  });
});
