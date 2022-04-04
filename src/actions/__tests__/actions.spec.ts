import { expect } from "@open-wc/testing";
import { actionInitApp, INIT_APP } from "../actions";
import { default_state } from "../../stores/state";
import { register, resetDispatcher } from "../../stores/dispatcher";

describe("actions", () => {
  it("init", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === INIT_APP;
      return Promise.resolve(state);
    });
    await actionInitApp();
    expect(handle).to.be.true;
  });
});
