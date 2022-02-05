import { expect, fixture, html } from "@open-wc/testing";
import EditorMain from "../editor-main";
import { reset_dispatcher } from "../../stores/dispatcher";
import { stateTest } from "../../__tests__/TestHelpers";
import sinon from "sinon";
import FeatureFlag from "../../stores/FeatureFlag";

suite("Main app element", () => {
  test("is defined", async () => {
    reset_dispatcher(stateTest);
    const el: EditorMain = await fixture(html` <editor-main></editor-main> `);
    expect(el).to.instanceOf(EditorMain);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <compose-menu class="no_print"></compose-menu>
            <main-screen></main-screen>
            <zoom-grid class="no_print"></zoom-grid>
            <compose-keys class="no_print"></compose-keys>
            <transpose-grid class="no_print"></transpose-grid>
            <compose-modals class="no_print"></compose-modals>
            <compose-notification class="no_print"></compose-notification>
            <google-api class="no_print"></google-api>
        `);
  });

  test("is defined with synchro enabled", async () => {
    sinon.stub(FeatureFlag, "get").callsFake(() => {
      return { synchro_enabled: true };
    });
    reset_dispatcher(stateTest);
    const el: EditorMain = await fixture(html` <editor-main></editor-main> `);
    expect(el).to.instanceOf(EditorMain);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <compose-menu class="no_print"></compose-menu>
            <main-screen></main-screen>
            <zoom-grid class="no_print"></zoom-grid>
            <compose-keys class="no_print"></compose-keys>
            <transpose-grid class="no_print"></transpose-grid>
            <account-status class="no_print" ontouchstart=""></account-status>
            <compose-modals class="no_print"></compose-modals>
            <compose-notification class="no_print"></compose-notification>
            <google-api class="no_print"></google-api>
        `);
  });
});
