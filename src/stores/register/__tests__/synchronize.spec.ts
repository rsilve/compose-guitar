import { expect } from "@open-wc/testing";
import {
  MODALS_CLOSE,
  SYNCHRO_ACTIVATION,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_FORCE,
  SYNCHRO_FORCE_START,
  SYNCHRO_SIGN_IN,
  SYNCHRO_SIGN_OUT,
  SYNCHRO_TOGGLE_ENABLED,
} from "../../../actions/actions";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import { synchronizeCallback } from "../synchronize";
import sinon from "sinon";
import { synchronizer } from "../synchronizer";
import DispatcherError from "../../DispatcherError";

suite("synchronize callback", () => {
  const st = stateTest;
  const stub = sinon.stub(synchronizer);

  test("activation request", async () => {
    const state = await synchronizeCallback(new Action(SYNCHRO_ACTIVATION_REQUEST), { ...st });
    expect(state.synchronization.open).to.be.true;
  });

  test("deactivation request", async () => {
    const state = await synchronizeCallback(new Action(SYNCHRO_DEACTIVATION_REQUEST), { ...st });
    expect(state.synchronization.open).to.be.true;
  });

  test("configuration close keyboard", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, open: true };
    const state = await synchronizeCallback(new Action(MODALS_CLOSE), { ...st, synchronization });
    expect(state.synchronization.open).to.be.undefined;
  });

  test("configuration close", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, open: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_CONFIGURATION_CLOSE), { ...st, synchronization });
    expect(state.synchronization.open).to.be.undefined;
  });

  test("activate", async () => {
    const state = await synchronizeCallback(new Action(SYNCHRO_ACTIVATION), { ...st });
    expect(state.synchronization.enabled).to.be.true;
    expect(state.synchronization.error).to.be.undefined;
    expect(state.synchronization.signInProgress).to.be.true;
  });

  test("deactivate", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_DEACTIVATION), { ...st, synchronization });
    expect(state.synchronization.enabled).to.be.false;
    expect(state.synchronization.signInProgress).to.be.undefined;
  });

  test("sign_in", async () => {
    stub.signIn.returns(Promise.resolve(true));
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true, error: "ee", signInProgress: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_SIGN_IN), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.true;
    expect(state.synchronization.error).to.be.undefined;
    expect(state.synchronization.signInProgress).to.be.undefined;
  });

  test("no sign_in if not enabled", async () => {
    stub.signIn.returns(Promise.resolve(true));
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: false, signInProgress: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_SIGN_IN), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.undefined;
    expect(state.synchronization.signInProgress).to.be.undefined;
  });

  test("no sign_in if error", async () => {
    stub.signIn.returns(Promise.reject({ reason: "error" }));
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true, signInProgress: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_SIGN_IN), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.false;
    const error = state.synchronization.error as { reason: string };
    expect(error.reason).to.be.equal("error");
    expect(state.synchronization.signInProgress).to.be.undefined;
  });

  test("sign_out", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: false, signInValid: true, signInProgress: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_SIGN_OUT), { ...st, synchronization });
    expect(state.synchronization.signInValid).to.be.undefined;
    expect(state.synchronization.error).to.be.undefined;
    expect(state.synchronization.signInProgress).to.be.undefined;
  });

  test("force_sync start", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, enabled: true, signInValid: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_FORCE_START), { ...st, synchronization });
    expect(state.synchronization.syncInProgress).to.be.true;
  });

  test("force_sync start failed if already running", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, syncInProgress: true };
    try {
      await synchronizeCallback(new Action(SYNCHRO_FORCE_START), { ...st, synchronization });
    } catch (e: unknown) {
      const dispatchErr = e as DispatcherError;
      expect(dispatchErr.message).to.be.equal("Synchronization in progress");
    }
  });

  test("force_sync", async () => {
    let { synchronization } = st;
    synchronization = { ...synchronization, syncInProgress: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_FORCE), { ...st, synchronization });
    expect(state.synchronization.syncInProgress).to.be.undefined;
  });

  test("toggle sync on", async () => {
    const state = await synchronizeCallback(new Action(SYNCHRO_TOGGLE_ENABLED), { ...st });
    expect(state.synchronization.enabled).to.be.false;
    expect(state.featureFlags?.synchro_enabled).to.be.true;
  });

  test("toggle sync off", async () => {
    let { featureFlags } = st;
    featureFlags = { ...featureFlags, synchro_enabled: true };
    const state = await synchronizeCallback(new Action(SYNCHRO_TOGGLE_ENABLED), { ...st, featureFlags });
    expect(state.synchronization.enabled).to.be.false;
    expect(state.featureFlags?.synchro_enabled).to.be.false;
  });
});
