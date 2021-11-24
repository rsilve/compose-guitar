import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeNotification from "../SynchronizeNotification";
import { register, reset_dispatcher } from "../../../stores/dispatcher";
import { state_test } from "../../../__tests__/TestHelpers";
import { SYNCHRO_ACTIVATION_REQUEST, SYNCHRO_DEACTIVATION_REQUEST } from "../../actions/actions";

suite("synchronize-notification element", () => {
  const st = state_test;

  test("is defined", async () => {
    const el: SynchronizeNotification = await fixture(html` <synchronize-notification></synchronize-notification>`);
    expect(el).to.instanceOf(SynchronizeNotification);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("is inactive", async () => {
    const el: SynchronizeNotification = await fixture(html` <synchronize-notification></synchronize-notification>`);
    await expect(el).shadowDom.to.equal("<div>sync inactive</div>");
  });

  test("is active", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const el: SynchronizeNotification = await fixture(html` <synchronize-notification></synchronize-notification>`);
    await expect(el).shadowDom.to.equal("<div>sync active</div>");
  });

  test("has an active action", async () => {
    reset_dispatcher({ ...st });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_ACTIVATION_REQUEST);
        return Promise.resolve(state);
      });
    });
    const el: SynchronizeNotification = await fixture(html` <synchronize-notification></synchronize-notification>`);
    await expect(el).shadowDom.to.equal("<div>sync inactive</div>");
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
    const el: SynchronizeNotification = await fixture(html` <synchronize-notification></synchronize-notification>`);
    await expect(el).shadowDom.to.equal("<div>sync active</div>");
    const div = el.shadowRoot?.querySelector("div");
    div?.click();
    const res = await promise;
    expect(res).to.be.true;
  });
});
