import { expect } from "@open-wc/testing";
import { INIT_APP, TRANSPOSE_CHANGE, ZOOM_CHANGE } from "../../../actions/actions";

import { initAppCallback, transposeChangeCallback, zoomChangeCallback } from "../misc";
import { saveLastState } from "../gallery_tools";
import { stateTest } from "../../../__tests__/TestHelpers";
import { IState, STATE_VERSION } from "../../state";
import Action from "../../../actions/Action";
import FeatureFlag from "../../FeatureFlag";

describe("Register misc", () => {
  const st = stateTest;

  it("init_app_callback", async () => {
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
    saveLastState(last_state);
    const state = await initAppCallback(new Action(INIT_APP), { ...st });
    expect(state).to.deep.equal(last_state);
    expect(FeatureFlag.get().synchro_enabled).to.be.true;
  });

  it("zoom_change_callback", async () => {
    const state = await zoomChangeCallback(new Action(ZOOM_CHANGE, { zoom: 101 }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 101 });
  });

  it("zoom_change_callback 001", async () => {
    const state = await zoomChangeCallback(new Action(ZOOM_CHANGE, { zoom: 201 }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 200 });
  });

  it("zoom_change_callback 002", async () => {
    const state = await zoomChangeCallback(new Action(ZOOM_CHANGE, { zoom: 9 }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 10 });
  });

  it("zoom_change_callback 003", async () => {
    const state = await zoomChangeCallback(new Action(ZOOM_CHANGE, { zoom: undefined }), { ...st });
    expect(state).to.deep.equal({ ...st, zoom: 100 });
  });

  it("transpose_change_callback", async () => {
    const state = await transposeChangeCallback(new Action(TRANSPOSE_CHANGE, { transpose: 2 }), { ...st });
    expect(state).to.deep.equal({ ...st, transpose: 2 });
  });

  it("transpose_change_callback 001", async () => {
    const state = await transposeChangeCallback(new Action(TRANSPOSE_CHANGE, { transpose: 13 }), { ...st });
    expect(state).to.deep.equal({ ...st, transpose: 12 });
  });

  it("transpose_change_callback 002", async () => {
    const state = await transposeChangeCallback(new Action(TRANSPOSE_CHANGE, { transpose: -13 }), { ...st });
    expect(state).to.deep.equal({ ...st, transpose: -12 });
  });

  it("transpose_change_callback 003", async () => {
    const state = await transposeChangeCallback(new Action(TRANSPOSE_CHANGE, { transpose: "a" }), { ...st });
    expect(state).to.deep.equal({ ...st });
  });
});
