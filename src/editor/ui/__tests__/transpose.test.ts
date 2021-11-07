import {expect, fixture, html} from "@open-wc/testing";
import TransposeGrid from "../TransposeGrid";

suite("transpose element", () => {

    test('is defined', async () => {
        const el: TransposeGrid = await fixture(html`
            <transpose-grid></transpose-grid>s`);
        expect(el).to.instanceOf(TransposeGrid)
        await expect(el).shadowDom.to.be.accessible();
        await expect(el).shadowDom.to.equal(
            `<label title="transpose">
                <input type="range" min="-11" max="11" >
                <div>0 tone</div>
            </label>`
        );
    });

})

