import { expect } from "@open-wc/testing";
import { INIT_APP, TRANSPOSE_CHANGE, ZOOM_CHANGE } from "../../../actions/actions";

import { init_app_callback, transpose_change_callback, zoom_change_callback } from "../misc";
import { save_last_state } from "../gallery_tools";
import { state_test } from "../../../__tests__/TestHelpers";
import { IState, STATE_VERSION } from "../../state";
import Action from "../../../actions/Action";
import FeatureFlag from "../../FeatureFlag";

suite("Register misc", () => {
  const st = state_test;

  test("init_app_callback", async () => {
    const last_state: IState = {
      version: STATE_VERSION,
      track: {
        title: "title2",
        grid_text: "B7",
      },
      zoom: 100,
      transpose: 0,
      synchronization: {
        enabled: false,
      },
      featureFlags: {
        synchro_enabled: true,
      },
    };
    save_last_state(last_state);
    const state = await init_app_callback(new Action(INIT_APP), { ...st });
    expect(state).to.deep.equal(last_state);
    expect(FeatureFlag.get().synchro_enabled).to.be.false;
  });

  test("zoom_change_callback", async () => {
    const state = await zoom_change_callback(new Action(ZOOM_CHANGE, { zoom: 101 }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 101 });
  });

  test("zoom_change_callback 001", async () => {
    const state = await zoom_change_callback(new Action(ZOOM_CHANGE, { zoom: 201 }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 200 });
  });

  test("zoom_change_callback 002", async () => {
    const state = await zoom_change_callback(new Action(ZOOM_CHANGE, { zoom: 9 }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 10 });
  });

  test("zoom_change_callback 003", async () => {
    const state = await zoom_change_callback(new Action(ZOOM_CHANGE, { zoom: undefined }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 100 });
  });

  test("transpose_change_callback", async () => {
    const state = await transpose_change_callback(new Action(TRANSPOSE_CHANGE, { transpose: 2 }), { ...st });
    expect(state).to.deep.equal({ ...st, transpose: 2 });
  });

  test("transpose_change_callback 001", async () => {
    const state = await transpose_change_callback(new Action(TRANSPOSE_CHANGE, { transpose: 13 }), { ...st });
    expect(state).to.deep.equal({ ...st, transpose: 12 });
  });

  test("transpose_change_callback 002", async () => {
    const state = await transpose_change_callback(new Action(TRANSPOSE_CHANGE, { transpose: -13 }), { ...st });
    expect(state).to.deep.equal({ ...st, transpose: -12 });
  });

  test("transpose_change_callback 003", async () => {
    const state = await transpose_change_callback(new Action(TRANSPOSE_CHANGE, { transpose: "a" }), { ...st });
    expect(state).to.deep.equal({ ...st });
  });
});
