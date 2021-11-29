import { expect } from "@open-wc/testing";
import {
  MODALS_CLOSE,
  SYNCHRO_ACTIVATION,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_SIGN_IN,
  SYNCHRO_SIGN_OUT,
} from "../../../actions/actions";
import { state_test } from "../../../../__tests__/TestHelpers";
import Action from "../../../../actions/Action";
import { synchronize_callback } from "../synchronize";
import sinon from "sinon";
import { googleApiWrapper } from "../google-api";

suite("synchronize callback", () => {
  const st = state_test;
  const stub = sinon.stub(googleApiWrapper);

  test("activation request", async () => {
    const state = await synchronize_callback(new Action(SYNCHRO_ACTIVATION_REQUEST), { ...st });
    expect(state.synchronization.open).to.be.true;
  });

  test("deactivation request", async () => {
    const state = await synchronize_callback(new Action(SYNCHRO_DEACTIVATION_REQUEST), { ...st });
    expect(state.synchronization.open).to.be.true;
  });

  test("configuration close keyboard", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, open: true };
    const state = await synchronize_callback(new Action(MODALS_CLOSE), { ...st, synchronization });
    expect(state.synchronization.open).to.be.undefined;
  });

  test("configuration close", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, open: true };
    const state = await synchronize_callback(new Action(SYNCHRO_CONFIGURATION_CLOSE), { ...st, synchronization });
    expect(state.synchronization.open).to.be.undefined;
  });

  test("activate", async () => {
    const state = await synchronize_callback(new Action(SYNCHRO_ACTIVATION), { ...st });
    expect(state.synchronization.enabled).to.be.true;
    expect(state.synchronization.error).to.be.undefined;
    expect(state.synchronization.inProgress).to.be.true;
  });

  test("deactivate", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true };
    const state = await synchronize_callback(new Action(SYNCHRO_DEACTIVATION), { ...st, synchronization });
    expect(state.synchronization.enabled).to.be.false;
    expect(state.synchronization.inProgress).to.be.undefined;
  });

  test("sign_in", async () => {
    stub.signIn.returns(Promise.resolve(true));
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true, error: "ee", inProgress: true };
    const state = await synchronize_callback(new Action(SYNCHRO_SIGN_IN), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.true;
    expect(state.synchronization.error).to.be.undefined;
    expect(state.synchronization.inProgress).to.be.undefined;
  });

  test("no sign_in if not enabled", async () => {
    stub.signIn.returns(Promise.resolve(true));
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: false, inProgress: true };
    const state = await synchronize_callback(new Action(SYNCHRO_SIGN_IN), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.undefined;
    expect(state.synchronization.inProgress).to.be.undefined;
  });

  test("no sign_in if error", async () => {
    stub.signIn.returns(Promise.reject({ reason: "error" }));
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true, inProgress: true };
    const state = await synchronize_callback(new Action(SYNCHRO_SIGN_IN), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.false;
    const error = state.synchronization.error as { reason: string };
    expect(error.reason).to.be.equal("error");
    expect(state.synchronization.inProgress).to.be.undefined;
  });

  test("sign_out", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: false, signInValid: true, inProgress: true };
    const state = await synchronize_callback(new Action(SYNCHRO_SIGN_OUT), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.undefined;
    expect(state.synchronization.error).to.be.undefined;
    expect(state.synchronization.inProgress).to.be.undefined;
  });
});
