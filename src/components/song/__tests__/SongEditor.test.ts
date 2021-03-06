import { expect, fixture, html } from "@open-wc/testing";
import SongEditor from "../SongEditor";

describe("Grid element", () => {
  it("is defined", async () => {
    const el: SongEditor = await fixture(html` <song-editor></song-editor> `);
    expect(el).to.instanceOf(SongEditor);
    await expect(el).shadowDom.to.be.accessible();
  });
});
