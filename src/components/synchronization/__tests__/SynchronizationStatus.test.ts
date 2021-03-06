import { expect, fixture, html } from "@open-wc/testing";
import SynchronizationStatus from "../SynchronizationStatus";

describe("synchronization-status element", () => {
  it("is defined", async () => {
    const el: SynchronizationStatus = await fixture(html`<synchronization-status></synchronization-status>`);
    expect(el).to.instanceOf(SynchronizationStatus);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equal(`<div>↻</div>`);
  });

  it("has active attribute", async () => {
    const el: SynchronizationStatus = await fixture(
      html`<synchronization-status .active="${true}"></synchronization-status>`
    );
    expect(el).to.instanceOf(SynchronizationStatus);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equal(`<div class="rotating">↻</div>`);
  });
});
