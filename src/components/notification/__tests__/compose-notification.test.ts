import { expect, fixture, html } from "@open-wc/testing";
import ComposeNotification from "../compose-notification";
import { stateTest } from "../../../__tests__/TestHelpers";
import { resetDispatcher } from "../../../stores/dispatcher";
import { NotificationMessageEnum } from "../NotificationMessageEnum";

describe("compose-notification element", () => {
  const st = stateTest;

  it("is defined", async () => {
    const el: ComposeNotification = await fixture(html` <compose-notification></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <ul></ul>        
        `);
  });

  it("with message", async () => {
    resetDispatcher({ ...st, notification: NotificationMessageEnum.SAVE_COMPLETED });
    const el: ComposeNotification = await fixture(html` <compose-notification></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <ul><li>Save completed</li></ul>        
        `);
  });

  it("with message after timeout", async () => {
    resetDispatcher({ ...st, notification: NotificationMessageEnum.SAVE_COMPLETED });
    const el: ComposeNotification = await fixture(html` <compose-notification delay="100"></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    await promise;
    expect(el).shadowDom.to.be.equal(`
 <ul></ul>        
        `);
  });
});
