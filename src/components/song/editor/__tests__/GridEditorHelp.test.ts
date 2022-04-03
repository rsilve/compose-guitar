import { expect, fixture, html } from "@open-wc/testing";
import GridEditorHelp from "../GridEditorHelp";

describe("Grid Editor Help element", () => {
  it("is defined", async () => {
    const el: GridEditorHelp = await fixture(html` <grid-editor-help></grid-editor-help> `);
    expect(el).to.instanceOf(GridEditorHelp);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(``);
  });

  it("have open attribute", async () => {
    const el: GridEditorHelp = await fixture(html` <grid-editor-help open=${true}></grid-editor-help> `);
    expect(el).to.instanceOf(GridEditorHelp);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.not.be.equal(``);
  });
});
