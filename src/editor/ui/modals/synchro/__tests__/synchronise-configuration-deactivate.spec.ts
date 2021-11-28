import { expect, fixture, html } from "@open-wc/testing";
import SynchronizationConfigurationDeactivated from "../SynchronizationConfigurationDeactivated";

suite("synchronise configuration deactivate element", () => {
  test("is defined", async () => {
    const el: SynchronizationConfigurationDeactivated = await fixture(
      html`<synchronization-configuration-deactivated></synchronization-configuration-deactivated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationDeactivated);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("has an activate button", async () => {
    let handle = false;
    const el: SynchronizationConfigurationDeactivated = await fixture(html` <synchronization-configuration-deactivated
      @activate="${() => (handle = true)}"
    ></synchronization-configuration-deactivated>`);
    expect(el).to.instanceOf(SynchronizationConfigurationDeactivated);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._activate") as HTMLElement;
    node.click();
    expect(handle).to.be.true;
  });
});
