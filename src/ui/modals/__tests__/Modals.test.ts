import { expect, fixture, html } from "@open-wc/testing";
import Modals from "../Modals";
import { resetDispatcher } from "../../../stores/dispatcher";
import { stateTest } from "../../../__tests__/TestHelpers";

describe("Modals element", () => {
  const st = stateTest;

  it("is defined", async () => {
    resetDispatcher({ ...st });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  it("open gallery", async () => {
    resetDispatcher({ ...st, gallery: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <track-gallery class="modal"></track-gallery>`);
  });

  it("open editor", async () => {
    resetDispatcher({ ...st, editor: {} });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <song-editor class="modal"></song-editor>`);
  });

  it("open help", async () => {
    resetDispatcher({ ...st, help_open: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <help-modal class="modal"></help-modal>`);
  });

  it("confirm save", async () => {
    resetDispatcher({ ...st, confirm_save: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <confirm-save class="modal"></confirm-save>`);
  });
});
