import { expect, fixture, html } from "@open-wc/testing";
import ComposeNotification from "../compose-notification";
import { stateTest } from "../../../__tests__/TestHelpers";
import { resetDispatcher } from "../../../stores/dispatcher";

suite("compose-notification element", () => {
  const st = stateTest;

  test("is defined", async () => {
    const el: ComposeNotification = await fixture(html` <compose-notification></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <ul></ul>        
        `);
  });

  test("with message", async () => {
    resetDispatcher({ ...st, notification: "test" });
    const el: ComposeNotification = await fixture(html` <compose-notification></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <ul><li>test</li></ul>        
        `);
  });

  test("with message after timeout", async () => {
    resetDispatcher({ ...st, notification: "test" });
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
