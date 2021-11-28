import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeConfigurationActivate from "../SynchronizeConfigurationActivate";
import { IStateSynchronization } from "../../../../stores/state";

suite("synchronise configuration activate element", () => {
  test("is defined", async () => {
    const el: SynchronizeConfigurationActivate = await fixture(
      html`<synchronize-configuration-activate></synchronize-configuration-activate>`
    );
    expect(el).to.instanceOf(SynchronizeConfigurationActivate);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("has a deactivate button", async () => {
    const sync: IStateSynchronization = { enabled: true };
    let handle = false;
    const el: SynchronizeConfigurationActivate = await fixture(
      html` <synchronize-configuration-activate
        .synchronisation="${sync}"
        @deactivate="${() => (handle = true)}"
      ></synchronize-configuration-activate>`
    );
    expect(el).to.instanceOf(SynchronizeConfigurationActivate);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._deactivate") as HTMLElement;
    node.click();
    expect(handle).to.be.true;
  });

  test("display warning if signin not active", async () => {
    const sync: IStateSynchronization = { enabled: true, signInValid: false };
    const el: SynchronizeConfigurationActivate = await fixture(
      html` <synchronize-configuration-activate .synchronization="${sync}"></synchronize-configuration-activate>`
    );
    expect(el).to.instanceOf(SynchronizeConfigurationActivate);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <div>Do you want to deactivate synchronization ?
                 <button class="btn-secondary _deactivate">deactivate</button></div>
            <div>not connected</div>
        `);
  });

  test("display warning if signin have failed", async () => {
    const sync: IStateSynchronization = { enabled: true, signInValid: false, error: { error: "blocked" } };
    const el: SynchronizeConfigurationActivate = await fixture(
      html` <synchronize-configuration-activate .synchronization="${sync}"></synchronize-configuration-activate>`
    );
    expect(el).to.instanceOf(SynchronizeConfigurationActivate);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <div>Do you want to deactivate synchronization ?
                 <button class="btn-secondary _deactivate">deactivate</button></div>
            <div>not connected</div>
            <div>blocked</div>
        `);
  });
});
