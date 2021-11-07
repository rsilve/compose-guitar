import {expect, fixture, html} from "@open-wc/testing";
import "../MeasureElement2";
import Measure from "../../../parser/Measure";

suite("Measure2", () => {

    test('is defined', async () => {
        const el = await fixture(html`
            <chords-grid-measure2></chords-grid-measure2>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(``)
    });

    test('is defined with measure', async () => {
        const el = await fixture(html`
            <chords-grid-measure2 .measure="${new Measure("A B _ _ ")}"></chords-grid-measure2>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
<table class="grid-measure-2" cellPadding="0" cellSpacing="0">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1"><div class="chord"><span class="chord_note">A</span></div></td>
                    <td class="grid-measure-beat-2"><div class="chord"><span class="chord_note">B</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3"><div class="chord"><span class="chord_note">B</span></div></td>
                    <td>%</td>
                </tr>
                </tbody>
            </table>
       `)
    });


    test('is defined with measure and transpose', async () => {
        const el = await fixture(html`
            <chords-grid-measure2 .measure="${new Measure("C D _ _")}" transpose="2"></chords-grid-measure2>`)
        await expect(el).shadowDom.to.be.accessible();
        expect(el).shadowDom.to.be.equal(`
        <table class="grid-measure-2" cellPadding="0" cellSpacing="0">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1"><div class="chord"><span class="chord_note">D</span></div></td>
                    <td class="grid-measure-beat-2"><div class="chord"><span class="chord_note">E</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3"><div class="chord"><span class="chord_note">E</span></div></td>
                    <td>%</td>
                </tr>
                </tbody>
            </table>`)
    });


})

