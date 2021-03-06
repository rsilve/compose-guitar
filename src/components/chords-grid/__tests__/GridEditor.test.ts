import { expect, fixture, html } from "@open-wc/testing";
import GridEditor from "../GridEditor";

describe("Grid Editor element", () => {
  it("is defined", async () => {
    const el: GridEditor = await fixture(html` <grid-editor></grid-editor> `);
    expect(el).to.instanceOf(GridEditor);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="input-label">Chord sequence (required)</div>
        <textarea required placeholder="| Am7 Am7M | Am7 Am6 |
| F Dm7 | Dm6 E7 | Dm E7 |
  ..."></textarea>
        `);
  });

  it("have value attribute", async () => {
    const el: GridEditor = await fixture(html` <grid-editor value="A | B"></grid-editor> `);
    expect(el).to.instanceOf(GridEditor);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="input-label">Chord sequence (required)</div>
        <textarea required placeholder="| Am7 Am7M | Am7 Am6 |
| F Dm7 | Dm6 E7 | Dm E7 |
  ..."></textarea>
        `);
  });

  it("validate value", async () => {
    const el: GridEditor = await fixture(html` <grid-editor value="invalid"></grid-editor> `);
    expect(el).to.instanceOf(GridEditor);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
    <div class="input-label">Chord sequence (required)</div>
        <textarea required placeholder="| Am7 Am7M | Am7 Am6 |
| F Dm7 | Dm6 E7 | Dm E7 |
  ..." class="invalid"></textarea>
        <div class="song-editor-body-form-error">Invalid syntax: invalid</div>
        `);
  });

  it("validate value on input change", async () => {
    const el: GridEditor = await fixture(html` <grid-editor value="A"></grid-editor> `);
    expect(el).to.instanceOf(GridEditor);
    await expect(el).shadowDom.to.be.accessible();

    const node = el.shadowRoot?.querySelector("textarea") as HTMLTextAreaElement;
    node.setSelectionRange(0, 1);
    node.setRangeText("ek");
    const e = new InputEvent("input");
    node.dispatchEvent(e);

    await el.updateComplete;
    expect(el).shadowDom.to.be.equal(`
        <div class="input-label">Chord sequence (required)</div>
        <textarea required placeholder="| Am7 Am7M | Am7 Am6 |
| F Dm7 | Dm6 E7 | Dm E7 |
  ..." class="invalid"></textarea>
        <div class="song-editor-body-form-error">Invalid syntax: Ek</div>
        `);
  });

  it("notify on input change", async () => {
    const thenable = new Promise<boolean>((resolve) => {
      resolve(true);
    });

    const promise = Promise.resolve(thenable);
    const handler = () => {
      thenable.then();
    };
    const el: GridEditor = await fixture(html` <grid-editor value="A" @update-grid="${handler}"></grid-editor> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("textarea") as HTMLTextAreaElement;
    node.setSelectionRange(0, 1);
    node.setRangeText("ek");
    const e = new InputEvent("input");
    node.dispatchEvent(e);

    await el.updateComplete;
    expect(el).shadowDom.to.be.equal(`
        <div class="input-label">Chord sequence (required)</div>
        <textarea required placeholder="| Am7 Am7M | Am7 Am6 |
| F Dm7 | Dm6 E7 | Dm E7 |
  ..." class="invalid"></textarea>
        <div class="song-editor-body-form-error">Invalid syntax: Ek</div>
        `);
    const res = await promise;
    expect(res).to.be.true;
  });
});
