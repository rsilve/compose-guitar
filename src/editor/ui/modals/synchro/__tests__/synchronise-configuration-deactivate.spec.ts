import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeConfigurationDeactivate from "../SynchronizeConfigurationDeactivate";

suite("synchronise configuration deactivate element", () => {
  test("is defined", async () => {
    const el: SynchronizeConfigurationDeactivate = await fixture(
      html`<synchronize-configuration-deactivate></synchronize-configuration-deactivate>`
    );
    expect(el).to.instanceOf(SynchronizeConfigurationDeactivate);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("has an activate button", async () => {
    let handle = false;
    const el: SynchronizeConfigurationDeactivate = await fixture(html`
      <synchronize-configuration-deactivate 
          @activate="${() => (handle = true)}"
          ></synchronize-configuration-deactivate>`);
    expect(el).to.instanceOf(SynchronizeConfigurationDeactivate);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._activate") as HTMLElement;
    node.click();
    expect(handle).to.be.true;
  });
});
