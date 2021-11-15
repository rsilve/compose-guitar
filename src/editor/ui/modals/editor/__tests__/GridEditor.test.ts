import {expect, fixture, html} from "@open-wc/testing";
import GridEditor from "../GridEditor";


suite("Grid Editor element", () => {

    test('is defined', async () => {
        const el: GridEditor = await fixture(html`
            <grid-editor></grid-editor> `);
        expect(el).to.instanceOf(GridEditor)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <textarea required placeholder="Chords (required)"></textarea>
        `)
    });

    test('have value attribute', async () => {
        const el: GridEditor = await fixture(html`
            <grid-editor value="A | B"></grid-editor> `);
        expect(el).to.instanceOf(GridEditor)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <textarea required placeholder="Chords (required)"></textarea>
        `)
    });

    test('validate value', async () => {
        const el: GridEditor = await fixture(html`
            <grid-editor value="invalid"></grid-editor> `);
        expect(el).to.instanceOf(GridEditor)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <textarea required placeholder="Chords (required)" class="invalid"></textarea>
        <div class="song-editor-body-form-error">Invalid syntax : invalid</div>
        `)
    });


})