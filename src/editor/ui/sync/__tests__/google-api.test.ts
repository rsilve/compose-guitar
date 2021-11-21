import {expect, fixture, html} from "@open-wc/testing";
import GoogleAPI from "../GoogleAPI";

suite("google-api element", () => {

    test('is defined', async () => {
        const el: GoogleAPI = await fixture(html`
            <google-api></google-api>`);
        expect(el).to.instanceOf(GoogleAPI)
        expect(el).shadowDom.to.be.accessible();
    });


})

