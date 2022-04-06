import { expect, fixture, html } from "@open-wc/testing";
import "../MeasureElement5";
import Measure from "../parser/Measure";

describe("Measure5", () => {
  it("is defined", async () => {
    const el = await fixture(html` <chords-grid-measure5></chords-grid-measure5>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  it("is defined with measure", async () => {
    const el = await fixture(html` <chords-grid-measure5 .measure="${new Measure("A B C _")}"></chords-grid-measure5>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <table class="grid-measure-5">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1"><div class="chord"><span class="chord_note">A</span></div></td>
                    <td class="grid-measure-beat-2"><div class="chord"><span class="chord_note">B</span></div></td>
                </tr>
                <tr>
                    <td colspan="2"><div class="chord"><span class="chord_note">C</span></div></td>
                </tr>
                </tbody>
            </table>
       `);
  });

  it("is defined with measure and transpose", async () => {
    const el = await fixture(html` <chords-grid-measure5
      .measure="${new Measure("C D G _")}"
      transpose="2"
    ></chords-grid-measure5>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <table class="grid-measure-5">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1"><div class="chord"><span class="chord_note">D</span></div></td>
                    <td class="grid-measure-beat-2"><div class="chord"><span class="chord_note">E</span></div></td>
                </tr>
                <tr>
                    <td colspan="2"><div class="chord"><span class="chord_note">A</span></div></td>
                </tr>
                </tbody>
            </table>
`);
  });
});
