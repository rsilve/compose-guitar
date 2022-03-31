import { expect } from "@open-wc/testing";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import { transposeChangeCallback } from "../store";
import { TRANSPOSE_CHANGE } from "../actions";

describe("Register misc", () => {
  const st = stateTest;

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
