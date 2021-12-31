import { expect, fixture, html } from "@open-wc/testing";
import AccountStatus from "../AccountStatus";
import { register, reset_dispatcher } from "../../stores/dispatcher";
import { state_test } from "../../__tests__/TestHelpers";
import {
  NOTIFICATION_OPEN,
  SYNCHRO_ACTIVATION_REQUEST,
  SYNCHRO_DEACTIVATION_REQUEST,
  SYNCHRO_FORCE,
  SYNCHRO_FORCE_START,
} from "../../actions/actions";

suite("account status element", () => {
  const st = state_test;

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
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal(`
      <div class="dot"><account-circle-icon title="Synchronization on (not working)"></account-circle-icon></div>
      <synchronization-status></synchronization-status>
`);
  });

  test("is active without warning", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, signInValid: true } });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal(`
        <div><account-circle-icon title="Synchronization on "></account-circle-icon></div>
        <synchronization-status></synchronization-status>
`);
  });

  test("has an active action", async () => {
    reset_dispatcher({ ...st });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_ACTIVATION_REQUEST);
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
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_DEACTIVATION_REQUEST);
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
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const promiseStart = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_FORCE_START);
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
    reset_dispatcher({ ...st, synchronization: { enabled: true } });

    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === SYNCHRO_FORCE) {
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
    reset_dispatcher({ ...st, synchronization: { enabled: true } });

    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === NOTIFICATION_OPEN) {
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
});
