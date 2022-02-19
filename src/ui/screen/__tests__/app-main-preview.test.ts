import { expect, fixture, html } from "@open-wc/testing";
import AppMainPreview from "../app-main-preview";
import { connect, register, resetDispatcher } from "../../../stores/dispatcher";
import { trackCallback } from "../../../stores/register/track";
import { IState } from "../../../stores/state";

describe("app main preview element", () => {
  it("is defined", async () => {
    const el: AppMainPreview = await fixture(html`
      <app-main-preview zoom="100" songTitle="title" songGrid="A"></app-main-preview>
    `);
    expect(el).to.instanceOf(AppMainPreview);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <div title="click to edit">
                <h1>title</h1>
                <chords-grid style="font-size:1em;"
                             text_grid="A"  transpose="0">
                </chords-grid>
                <p class="no_print">click to edit</p>
            </div>
        `);
  });

  it("handle edit", async () => {
    resetDispatcher();
    register(trackCallback);
    const promise: Promise<boolean> = new Promise((resolve) => {
      connect((st: IState) => {
        resolve(!!st.editor);
      });
    });
    const el: AppMainPreview = await fixture(html`
      <app-main-preview zoom="100" songTitle="title" songGrid="A"></app-main-preview>
    `);
    expect(el).to.instanceOf(AppMainPreview);
    const node = el.shadowRoot?.querySelector("div") as HTMLElement;
    node.click();
    await el.updateComplete;
    await promise.then((value) => expect(value).to.be.true);
  });
});
