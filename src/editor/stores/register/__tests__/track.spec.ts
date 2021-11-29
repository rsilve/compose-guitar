import { expect } from "@open-wc/testing";
import {
  MODALS_CLOSE,
  TRACK_EDIT,
  TRACK_EDIT_APPLY,
  TRACK_EDIT_CANCEL,
  TRACK_NEW,
  TRACK_NEW_CANCEL,
  TRACK_NEW_WITHOUT_SAVE,
} from "../../../actions/actions";
import { state_test } from "../../../../__tests__/TestHelpers";
import { track_callback } from "../track";
import Action from "../../../../actions/Action";

suite("track callback", () => {
  const st = state_test;

  test("new track", async () => {
    const state = await track_callback(new Action(TRACK_NEW), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.track).not.to.be.undefined;
    expect(state.track?.id).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  test("new track with save needed", async () => {
    const state = await track_callback(new Action(TRACK_NEW), {
      ...st,
      track: { ...st.track, updated_at: new Date().toISOString() },
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.true;
  });

  test("new track without save", async () => {
    const state = await track_callback(new Action(TRACK_NEW_WITHOUT_SAVE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });

  test("new track cancel", async () => {
    const state = await track_callback(new Action(TRACK_NEW_CANCEL), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  test("new track cancel (modal close", async () => {
    const state = await track_callback(new Action(MODALS_CLOSE), {
      ...st,
      transpose: 1,
    });
    expect(state.editor).to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(1);
  });

  test("edit track", async () => {
    const { track = {} } = st;
    const payload = { title: track.title, grid_text: track.grid_text };
    const state = await track_callback(new Action(TRACK_EDIT, payload), {
      ...st,
    });
    expect(state.editor).not.to.be.undefined;
    expect(state.editor).to.deep.equal(payload);
  });

  test("cancel track edition", async () => {
    const { track = {} } = st;
    const state = await track_callback(new Action(TRACK_EDIT_CANCEL), {
      ...st,
    });
    expect(state.editor).to.be.undefined;
    expect(state.track).to.deep.equal(track);
  });

  test("apply track edition", async () => {
    const { track = {} } = st;
    const payload = {
      title: "new title",
      grid_text: "new grid",
      updated_at: "now",
    };
    const state = await track_callback(new Action(TRACK_EDIT_APPLY, payload), {
      ...st,
    });
    expect(state.editor).to.be.undefined;
    expect(state.track).to.deep.equal({ ...track, ...payload });
  });

  test("apply track edition without track id", async () => {
    const { track = {} } = st;
    delete track.id;
    const payload = {
      title: "new title",
      grid_text: "new grid",
      updated_at: "now",
    };
    const state = await track_callback(new Action(TRACK_EDIT_APPLY, payload), {
      ...st,
    });
    expect(state.editor).to.be.undefined;
    expect(state.track?.id).to.not.be.null;
    delete state.track?.id;
    expect(state.track).to.deep.equal({ ...track, ...payload });
  });
});
