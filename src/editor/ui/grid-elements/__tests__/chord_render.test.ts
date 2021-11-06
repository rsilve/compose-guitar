import {expect, fixture, html} from "@open-wc/testing";
import {customElement, property} from "lit/decorators.js";
import chord_render from "../chord_render";
import Chord from "../../../parser/Chord";
import {html as lit_html, LitElement} from "lit";

@customElement('chord-render-test')
class ChordRenderTest extends LitElement {

    @property()
    chord: Chord = new Chord("A")

    render(): unknown {
        return lit_html`${chord_render(this.chord)}`
    }
}

suite("chord render", () => {

    test('is defined', async () => {
        const el = await fixture(html`<chord-render-test .chord="${new Chord("A")}"></chord-render-test>`)
        expect(el).to.be.instanceOf(ChordRenderTest)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <div class="chord"><span class="chord_note">A</span></div>`)
    });

    test('is defined with modifier', async () => {
        const el = await fixture(html`<chord-render-test .chord="${new Chord("A#")}"></chord-render-test>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <div class="chord">
        <span class="chord_note">A</span>
        <span class="chord_note_detail">
            <span class="chord_note_modifier">#</span>
        </span></div>`)
    });

    test('is defined with color', async () => {
        const el = await fixture(html`<chord-render-test .chord="${new Chord("Am")}"></chord-render-test>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <div class="chord">
        <span class="chord_note">A</span>
        <span class="chord_note_detail">
            <span class="chord_note_color">m</span>
        </span></div>`)
    });

    test('is defined with extension', async () => {
        const el = await fixture(html`<chord-render-test .chord="${new Chord("A7")}"></chord-render-test>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <div class="chord">
        <span class="chord_note">A</span>
        <span class="chord_note_extension">7</span>
        </div>`)
    });


    test('is defined with external base', async () => {
        const el = await fixture(html`<chord-render-test .chord="${new Chord("A/G")}"></chord-render-test>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <div class="chord">
        <span class="chord_note">A</span>
        <span class="chord_base_note">/G</span>
        </div>`)
    });

    test('is defined with external base and modifier', async () => {
        const el = await fixture(html`<chord-render-test .chord="${new Chord("A/G#")}"></chord-render-test>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <div class="chord">
        <span class="chord_note">A</span>
        <span class="chord_base_note">/G
            <span class="chord_base_note_modifier">#</span>
        </span>
        </div>`)
    });



})

