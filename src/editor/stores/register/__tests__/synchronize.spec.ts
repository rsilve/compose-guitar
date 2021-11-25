import { expect } from "@open-wc/testing";
import {
  MODALS_CLOSE,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION_REQUEST
} from "../../../actions/actions";
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

  test("configuration close keyboard", async () => {
    let { synchronization } = st
    synchronization = { ...synchronization, open: true}
    const state = await synchronize_callback(new Action(MODALS_CLOSE), { ...st, synchronization });
    expect(state.synchronization.open).to.be.undefined;
  });

  test("configuration close", async () => {
    let { synchronization } = st
    synchronization = { ...synchronization, open: true}
    const state = await synchronize_callback(new Action(SYNCHRO_CONFIGURATION_CLOSE), { ...st, synchronization });
    expect(state.synchronization.open).to.be.undefined;
  });
});
