import {expect, fixture, html} from "@open-wc/testing";
import SynchronizeConfiguration from "../SynchronizeConfiguration";


suite("synchronise configuration element", () => {

    test('is defined', async () => {
        const el: SynchronizeConfiguration = await fixture(html`
            <synchronize-configuration></synchronize-configuration>`);
        expect(el).to.instanceOf(SynchronizeConfiguration)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(``)
    });

})