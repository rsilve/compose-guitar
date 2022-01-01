import { expect, fixture, html } from "@open-wc/testing";
import SynchronizationConfigurationActivated from "../SynchronizationConfigurationActivated";
import { IStateSynchronization } from "../../../../stores/state";

suite("synchronise configuration activate element", () => {
  test("is defined", async () => {
    const el: SynchronizationConfigurationActivated = await fixture(
      html` <synchronization-configuration-activated></synchronization-configuration-activated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationActivated);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("has a deactivate button", async () => {
    const sync: IStateSynchronization = { enabled: true };
    let handle = false;
    const el: SynchronizationConfigurationActivated = await fixture(
      html` <synchronization-configuration-activated
        .synchronization="${sync}"
        @deactivate="${() => (handle = true)}"
      ></synchronization-configuration-activated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationActivated);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._deactivate") as HTMLElement;
    node.click();
    expect(handle).to.be.true;
  });

  test("display status if signin is active", async () => {
    const sync: IStateSynchronization = { enabled: true, signInValid: true };
    const el: SynchronizationConfigurationActivated = await fixture(
      html` <synchronization-configuration-activated
        .synchronization="${sync}"
      ></synchronization-configuration-activated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationActivated);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <div>Synchronization between devices is enabled.</div>
            <div>You are connected</div>
            <button class="btn-secondary btn-deactivate _deactivate">deactivate</button></div>
        `);
  });

  test("display warning if signin not active", async () => {
    const sync: IStateSynchronization = { enabled: true, signInValid: false };
    const el: SynchronizationConfigurationActivated = await fixture(
      html` <synchronization-configuration-activated
        .synchronization="${sync}"
      ></synchronization-configuration-activated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationActivated);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <div>Synchronization between devices is enabled but does not work ⚠️.</div>
            <div>You are not connected. <a href="">Retry ?</a></div>
            <button class="btn-secondary btn-deactivate _deactivate">deactivate</button></div>
        `);
  });

  test("display warning if signin have failed", async () => {
    const sync: IStateSynchronization = { enabled: true, signInValid: false, error: { error: "blocked" } };
    const el: SynchronizationConfigurationActivated = await fixture(
      html`
        <synchronization-configuration-activated
          .synchronization="${sync}"></synchronize-configuration-activate>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationActivated);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <div>Synchronization between devices is enabled but does not work ⚠️.</div>
            <div class="error">
              The error message was
              <div class="error-message">blocked</div>
            </div>
            <div>You are not connected. <a href="">Retry ?</a></div>
            <button class="btn-secondary btn-deactivate _deactivate">deactivate</button></div>
        `);
  });
});
