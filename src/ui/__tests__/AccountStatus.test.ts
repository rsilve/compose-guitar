import { expect, fixture, html } from "@open-wc/testing";
import AccountStatus from "../AccountStatus";
import { register, resetDispatcher } from "../../stores/dispatcher";
import { stateTest } from "../../__tests__/TestHelpers";
import {
  NOTIFICATION_OPEN,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_FORCE,
  SYNCHRO_FORCE_START,
} from "../../actions/actions";

suite("account status element", () => {
  const st = stateTest;

  test("is defined", async () => {
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    expect(el).to.instanceOf(AccountStatus);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("is inactive", async () => {
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal('<div><person-off-icon  title="Synchronization off"></person-off-icon></div>');
  });

  test("is active", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal(`
      <div class="dot"><account-circle-icon title="Synchronization on (not working)"></account-circle-icon></div>
      <synchronization-status></synchronization-status>
`);
  });

  test("is active without warning", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true, signInValid: true } });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal(`
        <div><account-circle-icon title="Synchronization on "></account-circle-icon></div>
        <synchronization-status></synchronization-status>
`);
  });

  test("has an active action", async () => {
    resetDispatcher({ ...st });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_ACTIVATION_REQUEST);
        return Promise.resolve(state);
      });
    });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal('<div><person-off-icon  title="Synchronization off"></person-off-icon></div>');
    const div = el.shadowRoot?.querySelector("div");
    div?.click();
    const res = await promise;
    expect(res).to.be.true;
  });

  test("has an inactive action", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_DEACTIVATION_REQUEST);
        return Promise.resolve(state);
      });
    });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal(`
      <div class="dot"><account-circle-icon title="Synchronization on (not working)"></account-circle-icon></div>
      <synchronization-status></synchronization-status>
      `);
    const div = el.shadowRoot?.querySelector("div");
    div?.click();
    const res = await promise;
    expect(res).to.be.true;
  });

  test("has a synchro start action", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const promiseStart = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_FORCE_START);
        return Promise.resolve(state);
      });
    });

    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.be.accessible();
    const div = el.shadowRoot?.querySelector("synchronization-status");
    div?.dispatchEvent(new MouseEvent("click"));
    const resStart = await promiseStart;
    expect(resStart).to.be.true;
  });

  test("has a synchro action", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });

    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.actionType === SYNCHRO_FORCE) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });

    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.be.accessible();
    const div = el.shadowRoot?.querySelector("synchronization-status");
    div?.dispatchEvent(new MouseEvent("click"));
    const res = await promise;
    expect(res).to.be.true;
  });

  test("has a synchro notif action", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });

    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.actionType === NOTIFICATION_OPEN) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });

    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.be.accessible();
    const div = el.shadowRoot?.querySelector("synchronization-status");
    div?.dispatchEvent(new MouseEvent("click"));
    const res = await promise;
    expect(res).to.be.true;
  });

  test("synchro start action does nothing if already started", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true, syncInProgress: true } });
    const promiseStart = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_FORCE_START);
        return Promise.resolve(state);
      });
    });

    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.be.accessible();
    const div = el.shadowRoot?.querySelector("synchronization-status");
    div?.dispatchEvent(new MouseEvent("click"));
    const resStart = await promiseStart;
    expect(resStart).to.be.false;
  });
});
