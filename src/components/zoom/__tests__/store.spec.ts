import { expect } from "@open-wc/testing";

import { stateTest } from "../../../__tests__/TestHelpers";
import { zoomChangeCallback } from "../store";
import { ZOOM_CHANGE } from "../actions";
import Action from "../../../lib/Action";

describe("Register misc", () => {
  const st = stateTest;

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
});
