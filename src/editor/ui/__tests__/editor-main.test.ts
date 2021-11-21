import {expect, fixture, html} from "@open-wc/testing";
import EditorMain from "../editor-main";

suite("Main app element", () => {

    test('is defined', async () => {
        const el: EditorMain = await fixture(html`
            <editor-main></editor-main> `);
        expect(el).to.instanceOf(EditorMain)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
            <compose-menu class="no_print"></compose-menu>
            <main-screen></main-screen>
            <zoom-grid class="no_print"></zoom-grid>
            <compose-keys class="no_print"></compose-keys>
            <transpose-grid class="no_print"></transpose-grid>
            <compose-modals class="no_print"></compose-modals>
            <compose-notification class="no_print"></compose-notification>
            <synchronize-notification class="no_print"></synchronize-notification>
        `)
    });


})

