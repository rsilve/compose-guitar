import {expect, fixture, html} from "@open-wc/testing";
import AppMainPreview from "../app-main-preview";

suite("app main preview element", () => {

    test('is defined', async () => {
        const el: AppMainPreview = await fixture(html`
            <app-main-preview zoom="100" song_title="title" song_grid="A"></app-main-preview> `);
        expect(el).to.instanceOf(AppMainPreview)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
            <div title="click to edit">
                <h1>title</h1>
                <chords-grid style="font-size:1em;"
                             text_grid="A"  transpose="0">
                </chords-grid>
                <p class="no_print">click to edit</p>
            </div>
        `)
    });


})

