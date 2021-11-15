import {expect, fixture, html} from "@open-wc/testing";
import GridEditor from "../GridEditor";


suite("Grid element", () => {

    test('is defined', async () => {
        const el: GridEditor = await fixture(html`
            <grid-editor></grid-editor> `);
        expect(el).to.instanceOf(GridEditor)
        await expect(el).shadowDom.to.be.accessible();

    });


})