import {expect, fixture, html} from "@open-wc/testing";
import SynchronizeNotification from "../SynchronizeNotification";

suite("synchronize-notification element", () => {

    test('is defined', async () => {
        const el: SynchronizeNotification = await fixture(html`
            <synchronize-notification></synchronize-notification>`);
        expect(el).to.instanceOf(SynchronizeNotification)
        expect(el).shadowDom.to.be.accessible();
    });

    test('is defined', async () => {
        const el: SynchronizeNotification = await fixture(html`
            <synchronize-notification></synchronize-notification>`);
        await expect(el).shadowDom.to.equal(
            `<div>sync</div>`
        );
    });

})

