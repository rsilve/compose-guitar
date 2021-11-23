import { expect, fixture, html } from "@open-wc/testing";
import Modals from "../Modals";
import { reset_dispatcher } from "../../../../stores/dispatcher";
import { state_test } from "../../../../__tests__/TestHelpers";

suite("Modals element", () => {
  const st = state_test;

  test("is defined", async () => {
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  test("open gallery", async () => {
    reset_dispatcher({ ...st, gallery: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <track-gallery class="modal"></track-gallery>`);
  });

  test("open editor", async () => {
    reset_dispatcher({ ...st, editor: {} });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <song-editor class="modal"></song-editor>`);
  });

  test("open help", async () => {
    reset_dispatcher({ ...st, help_open: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <help-modal class="modal"></help-modal>`);
  });

  test("confirm save", async () => {
    reset_dispatcher({ ...st, confirm_save: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <confirm-save class="modal"></confirm-save>`);
  });
});
