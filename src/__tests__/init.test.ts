import { expect } from "@open-wc/testing";
import init from "../init";
import { INIT_APP, NOTIFICATION_OPEN, SYNCHRO_FORCE, SYNCHRO_FORCE_START } from "../actions/actions";
import { connect, register } from "../stores/dispatcher";
import { IState } from "../stores/state";
import { get_last_state, save_last_state } from "../stores/register/gallery_tools";
import { state_test } from "./TestHelpers";

suite("Init", () => {
  test("init", async () => {
    localStorage.clear();

    let action_init_done = false;
    const promise = new Promise<void>((resolve) => {
      connect(() => {
        resolve();
      });
    });

    register((action, state): Promise<IState> => {
      action_init_done = action.action_type === INIT_APP;
      return Promise.resolve(state);
    });

    expect(get_last_state()).to.be.undefined;
    // initialize_state()
    init();
    await promise;
    expect(action_init_done).to.be.true;
    expect(get_last_state()).not.be.undefined;
  });

  test("init with sync", async () => {
    localStorage.clear();

    let action_init_done = false;
    const promise = new Promise<void>((resolve) => {
      connect(() => {
        resolve();
      });
    });

    register((action, state): Promise<IState> => {
      action_init_done = action.action_type === INIT_APP;
      return Promise.resolve(state);
    });
    const promiseSyncStart = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === SYNCHRO_FORCE_START) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });
    const promiseSync = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === SYNCHRO_FORCE) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });

    const promiseNotif = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === NOTIFICATION_OPEN) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });

    save_last_state({ ...state_test, synchronization: { enabled: true } });
    // initialize_state()
    init();
    await promise;
    expect(action_init_done).to.be.true;
    expect(get_last_state()).not.be.undefined;
    const resSyncStart = await promiseSyncStart;
    expect(resSyncStart).to.be.true;
    const resSync = await promiseSync;
    expect(resSync).to.be.true;
    const resNotif = await promiseNotif;
    expect(resNotif).to.be.true;
  });
});
