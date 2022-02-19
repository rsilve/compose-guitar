import { expect, fixture, html } from "@open-wc/testing";
import ConfirmSave from "../ConfirmSave";
import HelpModal from "../HelpModal";

describe("Help Modal element", () => {
  it("is defined", async () => {
    const el: ConfirmSave = await fixture(html` <help-modal></help-modal> `);
    expect(el).to.instanceOf(HelpModal);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("close event", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === "close";
    };
    const el: ConfirmSave = await fixture(html` <help-modal @close="${handler}"></help-modal> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._close") as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });

  it("toggle sync event", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === "toggleSyncEnable";
    };
    const el: ConfirmSave = await fixture(html` <help-modal @toggleSyncEnable="${handler}"></help-modal> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("[data-testid=featureSynchronizationEnabled]") as HTMLInputElement;
    node.click();
    expect(handled).to.be.true;
  });
});
