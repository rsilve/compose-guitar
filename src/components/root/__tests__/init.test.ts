import { expect } from "@open-wc/testing";
import init from "../initApp";
import { connect, register } from "../../../lib/dispatcher";
import { IState } from "../../../lib/state";
import { INIT_APP } from "../actions";
import { storage } from "../../../lib/gallery_tools";

describe("Init", () => {
  it("init", async () => {
    localStorage.clear();

    let action_init_done = false;
    const promise = new Promise<void>((resolve) => {
      connect(() => {
        resolve();
      });
    });

    register((action, state): Promise<IState> => {
      action_init_done = action.actionType === INIT_APP;
      return Promise.resolve(state);
    });

    expect(storage.getLastState()).to.be.undefined;
    // initialize_state()
    init();
    await promise;
    expect(action_init_done).to.be.true;
    expect(storage.getLastState()).not.be.undefined;
  });
});
