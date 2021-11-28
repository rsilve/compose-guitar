import { expect, fixture, html } from "@open-wc/testing";
import AccountStatus from "../AccountStatus";
import { register, reset_dispatcher } from "../../../stores/dispatcher";
import { state_test } from "../../../__tests__/TestHelpers";
import { SYNCHRO_ACTIVATION_REQUEST, SYNCHRO_DEACTIVATION_REQUEST } from "../../actions/actions";

suite("synchronize-notification element", () => {
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
    await expect(el).shadowDom.to.equal(
        '<div class="dot"><account-circle-icon title="Synchronization on (not working)"></account-circle-icon></div>'
    );
  });

  test("is active without warning", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, signInValid: true } });
    const el: AccountStatus = await fixture(html` <account-status></account-status>`);
    await expect(el).shadowDom.to.equal(
        '<div><account-circle-icon title="Synchronization on "></account-circle-icon></div>'
    );
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
    await expect(el).shadowDom.to.equal(
      '<div class="dot"><account-circle-icon title="Synchronization on (not working)"></account-circle-icon></div>'
    );
    const div = el.shadowRoot?.querySelector("div");
    div?.click();
    const res = await promise;
    expect(res).to.be.true;
  });
});
