import { expect, fixture, html } from "@open-wc/testing";
import "../MeasureElement6";
import Measure from "../../../parser/Measure";

suite("Measure6", () => {
  test("is defined", async () => {
    const el =
      await fixture(html` <chords-grid-measure6></chords-grid-measure6>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  test("is defined with measure", async () => {
    const el = await fixture(html` <chords-grid-measure6
      .measure="${new Measure("A B _ C")}"
    ></chords-grid-measure6>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <table class="grid-measure-6">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1"><div class="chord"><span class="chord_note">A</span></div></td>
                    <td class="grid-measure-beat-2"><div class="chord"><span class="chord_note">B</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3">%</td>
                    <td class="grid-measure-beat-4"><div class="chord"><span class="chord_note">C</span></div></td>
                </tr>
                </tbody>
            </table>
       `);
  });

  test("is defined with measure and transpose", async () => {
    const el = await fixture(html` <chords-grid-measure6
      .measure="${new Measure("C D _ G")}"
      transpose="2"
    ></chords-grid-measure6>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <table class="grid-measure-6">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1"><div class="chord"><span class="chord_note">D</span></div></td>
                    <td class="grid-measure-beat-2"><div class="chord"><span class="chord_note">E</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3">%</td>
                    <td class="grid-measure-beat-4"><div class="chord"><span class="chord_note">A</span></div></td>
                </tr>
                </tbody>
            </table>
`);
  });
});
