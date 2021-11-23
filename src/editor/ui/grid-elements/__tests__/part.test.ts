import { expect, fixture, html } from "@open-wc/testing";
import { customElement, property } from "lit/decorators.js";
import { html as lit_html, LitElement } from "lit";
import Measure from "../../../parser/Measure";
import part from "../part";

@customElement("part-test")
class ChordRenderTest extends LitElement {
  @property()
  measure: Measure = new Measure("A");

  render(): unknown {
    return lit_html`${part(this.measure)}`;
  }
}

suite("part render", () => {
  test("is defined", async () => {
    const el = await fixture(
      html`<part-test .measure="${new Measure("A")}"></part-test>`
    );
    expect(el).to.be.instanceOf(ChordRenderTest);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  test("is defined with part", async () => {
    const el = await fixture(
      html`<part-test .measure="${new Measure("(a) A")}"></part-test>`
    );
    expect(el).to.be.instanceOf(ChordRenderTest);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal('<div class="grid-measure-part">a</div>');
  });
});
