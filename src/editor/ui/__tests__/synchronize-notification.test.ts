import {expect, fixture, html} from "@open-wc/testing";
import SynchronizeNotification from "../SynchronizeNotification";
import {reset_dispatcher} from "../../../stores/dispatcher";
import {state_test} from "../../../__tests__/TestHelpers";

suite("synchronize-notification element", () => {

    const st = state_test

    test('is defined', async () => {
        const el: SynchronizeNotification = await fixture(html`
            <synchronize-notification></synchronize-notification>`);
        expect(el).to.instanceOf(SynchronizeNotification)
        expect(el).shadowDom.to.be.accessible();
    });

    test('is inactive', async () => {
        const el: SynchronizeNotification = await fixture(html`
            <synchronize-notification></synchronize-notification>`);
        await expect(el).shadowDom.to.equal(
            `<div>sync inactive</div>`
        );
    });

    test('is active', async () => {
        reset_dispatcher({...st, synchronization: {enabled: true}})
        const el: SynchronizeNotification = await fixture(html`
            <synchronize-notification></synchronize-notification>`);
        await expect(el).shadowDom.to.equal(
            `<div>sync active</div>`
        );
    });

})

