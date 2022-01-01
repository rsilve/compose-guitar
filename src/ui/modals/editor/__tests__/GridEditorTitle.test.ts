import { expect, fixture, html } from "@open-wc/testing";
import GridEditorTitle from "../GridEditorTitle";

suite("Grid Editor Title element", () => {
  test("is defined", async () => {
    const el: GridEditorTitle = await fixture(html` <grid-editor-title></grid-editor-title> `);
    expect(el).to.instanceOf(GridEditorTitle);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
    <div class="input-label">Song title (required)</div>
    <input
      id="title_input"
      type="text"
      required
      placeholder="My little valentine (Franck Sinatra)"
    />
        `);
  });

  test("have a invalid property", async () => {
    const el: GridEditorTitle = await fixture(html` <grid-editor-title .invalid="${true}"></grid-editor-title> `);
    expect(el).to.instanceOf(GridEditorTitle);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
    <div class="error-title">This title already exists</div>
    <div class="input-label">Song title (required)</div>
    <input
      id="title_input"
      class="invalid"
      type="text"
      required
      placeholder="My little valentine (Franck Sinatra)"
    />
        `);
  });

  test("have a input title", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.detail.value == "toto";
    };
    const el: GridEditorTitle = await fixture(
      html` <grid-editor-title @change-title="${handler}"></grid-editor-title> `
    );
    expect(el).to.instanceOf(GridEditorTitle);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    node.value = "toto";
    const options = {
      detail: { value: "toto" },
      bubbles: true,
      composed: true,
    };
    const e = new CustomEvent("change-title", options);
    node.dispatchEvent(e);
    expect(handled).to.be.true;
  });

  test("have a value property", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.detail.value == "toto";
    };
    const el: GridEditorTitle = await fixture(
      html` <grid-editor-title value="titi" @change-title="${handler}"></grid-editor-title> `
    );
    expect(el).to.instanceOf(GridEditorTitle);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const options = {
      detail: { value: "toto" },
      bubbles: true,
      composed: true,
    };
    const e = new CustomEvent("change-title", options);
    node.dispatchEvent(e);
    expect(handled).to.be.true;
  });
});
