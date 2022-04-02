import { expect } from "@open-wc/testing";
import {
  actionInitApp,
  actionSaveAsStart,
  actionSaveAsStartAndNew,
  actionSynchroForce,
  actionSynchroForceStart,
  actionSynchronizationActivation,
  actionSynchronizationActivationRequest,
  actionSynchronizationConfigurationClose,
  actionSynchronizationDeactivation,
  actionSynchronizationDeactivationRequest,
  actionSynchroSignIn,
  actionSynchroSignOut,
  actionSynchroToggleEnable,
  INIT_APP,
  SAVE_AS_START,
  SAVE_AS_START_AND_NEW,
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
} from "../actions";
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

  it("save_as_start", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SAVE_AS_START;
      return Promise.resolve(state);
    });
    await actionSaveAsStart();
    expect(handle).to.be.true;
  });

  it("save_as_start_and_new", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SAVE_AS_START_AND_NEW;
      return Promise.resolve(state);
    });
    await actionSaveAsStartAndNew();
    expect(handle).to.be.true;
  });

  it("action_synchronization_activation_request", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_ACTIVATION_REQUEST;
      return Promise.resolve(state);
    });
    await actionSynchronizationActivationRequest();
    expect(handle).to.be.true;
  });

  it("action_synchronization_deactivation_request", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_DEACTIVATION_REQUEST;
      return Promise.resolve(state);
    });
    await actionSynchronizationDeactivationRequest();
    expect(handle).to.be.true;
  });

  it("action_synchronization_activation", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_ACTIVATION;
      return Promise.resolve(state);
    });
    await actionSynchronizationActivation();
    expect(handle).to.be.true;
  });

  it("action_synchronization_deactivation", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_DEACTIVATION;
      return Promise.resolve(state);
    });
    await actionSynchronizationDeactivation();
    expect(handle).to.be.true;
  });

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

  it("action_synchro_sign_in", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_SIGN_IN;
      return Promise.resolve(state);
    });
    await actionSynchroSignIn();
    expect(handle).to.be.true;
  });

  it("action_remote_sign_out", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_SIGN_OUT;
      return Promise.resolve(state);
    });
    await actionSynchroSignOut();
    expect(handle).to.be.true;
  });

  it("action_synchro_force start", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_FORCE_START;
      return Promise.resolve(state);
    });
    await actionSynchroForceStart();
    expect(handle).to.be.true;
  });

  it("action_synchro_force", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_FORCE;
      return Promise.resolve(state);
    });
    await actionSynchroForce();
    expect(handle).to.be.true;
  });

  it("action_synchro_toggle_enable", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === SYNCHRO_TOGGLE_ENABLED;
      return Promise.resolve(state);
    });
    await actionSynchroToggleEnable();
    expect(handle).to.be.true;
  });
});
