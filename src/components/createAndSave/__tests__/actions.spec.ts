import { register, resetDispatcher } from "../../../stores/dispatcher";
import { default_state } from "../../../stores/state";
import { actionSaveAsStart, actionSaveAsStartAndNew, SAVE_AS_START, SAVE_AS_START_AND_NEW } from "../actions";
import { expect } from "@open-wc/testing";

describe("actions", () => {
  it("save_as_start", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SAVE_AS_START;
      return Promise.resolve(state);
    });
    await actionSaveAsStart();
    expect(handle).to.be.true;
  });

  it("save_as_start_and_new", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SAVE_AS_START_AND_NEW;
      return Promise.resolve(state);
    });
    await actionSaveAsStartAndNew();
    expect(handle).to.be.true;
  });
});
