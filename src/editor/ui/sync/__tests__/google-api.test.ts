import {expect, fixture, html} from "@open-wc/testing";
import GoogleAPI from "../GoogleAPI";

suite("google-api element", () => {

    test('is defined', async () => {
        const el: GoogleAPI = await fixture(html`
            <google-api></google-api>`);
        expect(el).to.instanceOf(GoogleAPI)
        await expect(el).shadowDom.to.be.accessible();
    });


    test('contains script', async () => {
        const el: GoogleAPI = await fixture(html`
            <google-api></google-api>`);
        await expect(el).shadowDom.to.be.accessible();
        const url = "https://apis.google.com/js/api.js"
        expect(el.shadowRoot?.innerHTML).to.contains(`<script src="${url}"></script>`)
    });


})

