import { register, resetDispatcher } from "../../../stores/dispatcher";
import { default_state } from "../../../stores/state";
import { expect } from "@open-wc/testing";
import { actionSynchronizationConfigurationClose, SYNCHRO_CONFIGURATION_CLOSE } from "../actions";

describe("actions", () => {
  it("action_synchronization_close", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_CONFIGURATION_CLOSE;
      return Promise.resolve(state);
    });
    await actionSynchronizationConfigurationClose();
    expect(handle).to.be.true;
  });
});
