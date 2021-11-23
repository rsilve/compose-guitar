import { expect, fixture, html } from "@open-wc/testing";
import "../MeasureElement4";
import Measure from "../../../parser/Measure";

suite("Measure4", () => {
  test("is defined", async () => {
    const el =
      await fixture(html` <chords-grid-measure4></chords-grid-measure4>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  test("is defined with measure", async () => {
    const el = await fixture(html` <chords-grid-measure4
      .measure="${new Measure("A _ _ B")}"
    ></chords-grid-measure4>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <table class="grid-measure-4">
                <tbody>
                <tr>
                    <td colSpan="2"><div class="chord"><span class="chord_note">A</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3"><div class="chord"><span class="chord_note">A</span></div></td>
                    <td class="grid-measure-beat-4"><div class="chord"><span class="chord_note">B</span></div></td>
                </tr>
                </tbody>
            </table>
       `);
  });

  test("is defined with measure and transpose", async () => {
    const el = await fixture(html` <chords-grid-measure4
      .measure="${new Measure("C _ _ D")}"
      transpose="2"
    ></chords-grid-measure4>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
       <table class="grid-measure-4">
                <tbody>
                <tr>
                    <td colSpan="2"><div class="chord"><span class="chord_note">D</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3"><div class="chord"><span class="chord_note">D</span></div></td>
                    <td class="grid-measure-beat-4"><div class="chord"><span class="chord_note">E</span></div></td>
                </tr>
                </tbody>
            </table>
`);
  });
});
