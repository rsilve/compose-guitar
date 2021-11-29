import { expect, fixture, html } from "@open-wc/testing";
import ChordsGrid from "../ChordsGrid";

suite("chords-grid element", () => {
  test("is defined", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody></tbody>
            </table>
        `);
  });

  test("have text_grid property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure1 transpose="0">
                            </chords-grid-measure1>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have transpose property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A" transpose="1"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure1 transpose="1">
                            </chords-grid-measure1>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 2 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A B _ _"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure2 transpose="0">
                            </chords-grid-measure2>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 3 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A B"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure3 transpose="0">
                            </chords-grid-measure3>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 4 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A _ _ B"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure4 transpose="0">
                            </chords-grid-measure4>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 5 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A B C _"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure5 transpose="0">
                            </chords-grid-measure5>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 6 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A B _ C"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure6 transpose="0">
                            </chords-grid-measure6>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 7 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A _ B C"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure7 transpose="0">
                            </chords-grid-measure7>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });

  test("have text_grid 8 property", async () => {
    const el: ChordsGrid = await fixture(html` <chords-grid text_grid="A B C D"></chords-grid> `);
    expect(el).to.instanceOf(ChordsGrid);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
             <table class="grid">
                <tbody>
                    <tr style="border-collapse: collapse">
                        <td class="grid grid-measure">
                            <chords-grid-measure8 transpose="0">
                            </chords-grid-measure8>
                        </td>
                    </tr>
                </tbody>
            </table>
        `);
  });
});
