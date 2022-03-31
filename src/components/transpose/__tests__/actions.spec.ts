import { expect } from "@open-wc/testing";
import { actionTransposeChange, TRANSPOSE_CHANGE } from "../actions";
import { register, resetDispatcher } from "../../../stores/dispatcher";
import { default_state } from "../../../stores/state";

describe("actions", () => {
  it("transpose", async () => {
    let handle = 0;
    resetDispatcher(default_state());
    register((action, state) => {
      if (action.actionType === TRANSPOSE_CHANGE) {
        const { transpose } = action.payload as { transpose: number };
        handle = transpose;
      }
      return Promise.resolve(state);
    });
    await actionTransposeChange(2);
    expect(handle).to.be.equal(2);
  });
});
