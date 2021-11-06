import {expect, fixture, html} from "@open-wc/testing";
import MenuItem from "../menu-item";

suite("Menu item element", () => {

    test('is defined', async () => {
        const el: MenuItem = await fixture(html`
            <menu-item></menu-item>`);
        expect(el).to.instanceOf(MenuItem)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
            <div>
                <slot></slot>
            </div>
        `)
    });

    test('has dot attribute', async () => {
        const el: MenuItem = await fixture(html`
            <menu-item dotted></menu-item>`);
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
            <div class="dot">
                <slot></slot>
            </div>
        `)
    });

    test('has dot property', async () => {
        const el: MenuItem = await fixture(html`
            <menu-item .dotted="${true}"></menu-item>`);
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
            <div class="dot">
                <slot></slot>
            </div>
        `)
    });

    test('has dot property with falsy value', async () => {
        const el: MenuItem = await fixture(html`
            <menu-item .dotted="${false}"></menu-item>`);
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
            <div>
                <slot></slot>
            </div>
        `)
    });


})

