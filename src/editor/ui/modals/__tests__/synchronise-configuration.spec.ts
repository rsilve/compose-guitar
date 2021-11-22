import {expect, fixture, html} from "@open-wc/testing";
import SynchronizeConfiguration from "../SynchronizeConfiguration";


suite("synchronise configuration element", () => {

    test('is defined', async () => {
        const el: SynchronizeConfiguration = await fixture(html`
            <synchronize-configuration></synchronize-configuration>`);
        expect(el).to.instanceOf(SynchronizeConfiguration)
        await expect(el).shadowDom.to.be.accessible();
    });


    test('have a close button', async () => {
        let handle_close = false
        const el: SynchronizeConfiguration = await fixture(html`
            <synchronize-configuration @close="${() => handle_close = true}"></synchronize-configuration>`);
        expect(el).to.instanceOf(SynchronizeConfiguration)
        await expect(el).shadowDom.to.be.accessible();
        const node = el.shadowRoot?.querySelector("._close") as HTMLElement
        expect(node).to.not.be.null
        node.click()
        expect(handle_close).to.be.true
    });

})