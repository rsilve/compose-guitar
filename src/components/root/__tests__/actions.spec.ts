import { expect } from "@open-wc/testing";
import { register, resetDispatcher } from "../../../lib/dispatcher";
import { default_state } from "../../../lib/state";
import { actionInitApp, INIT_APP } from "../actions";

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
