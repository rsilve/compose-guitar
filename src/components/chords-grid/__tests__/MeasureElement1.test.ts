import { expect, fixture, html } from "@open-wc/testing";
import "../MeasureElement1";
import Measure from "../parser/Measure";

describe("Measure1", () => {
  it("is defined", async () => {
    const el = await fixture(html` <chords-grid-measure1></chords-grid-measure1>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  it("is defined with measure", async () => {
    const el = await fixture(html` <chords-grid-measure1 .measure="${new Measure("A")}"></chords-grid-measure1>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <table class="grid-measure-1">
                <tbody>
                <tr>
                    <td><div class="chord"><span class="chord_note">A</span></div></td>
                </tr>
                </tbody>
            </table>`);
  });

  it("is defined with measure and transpose", async () => {
    const el = await fixture(html` <chords-grid-measure1
      .measure="${new Measure("A")}"
      transpose="2"
    ></chords-grid-measure1>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <table class="grid-measure-1">
                <tbody>
                <tr>
                    <td><div class="chord"><span class="chord_note">B</span></div></td>
                </tr>
                </tbody>
            </table>`);
  });
});
