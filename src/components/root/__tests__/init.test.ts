import { expect } from "@open-wc/testing";
import init from "../initApp";
import { connect, register } from "../../../stores/dispatcher";
import { IState } from "../../../stores/state";
import { storage } from "../../../stores/register/gallery_tools";
import { INIT_APP } from "../actions";

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
