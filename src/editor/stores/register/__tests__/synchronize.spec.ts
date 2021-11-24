import { expect } from "@open-wc/testing";
import { SYNCHRO_ACTIVATION_REQUEST, SYNCHRO_DEACTIVATION_REQUEST } from "../../../actions/actions";
import { state_test } from "../../../../__tests__/TestHelpers";
import Action from "../../../../actions/Action";
import { synchronize_callback } from "../synchronize";

suite("synchronize callback", () => {
  const st = state_test;

  test("activation request", async () => {
    const state = await synchronize_callback(new Action(SYNCHRO_ACTIVATION_REQUEST), { ...st });
    expect(state.synchronization.open).to.be.true;
  });

  test("deactivation request", async () => {
    const state = await synchronize_callback(new Action(SYNCHRO_DEACTIVATION_REQUEST), { ...st });
    expect(state.synchronization.open).to.be.true;
  });
});
