import { expect, fixture, html } from "@open-wc/testing";
import { customElement, property } from "lit/decorators.js";
import { html as lit_html, LitElement } from "lit";
import Measure from "../../../parser/Measure";
import { repeatEnd, repeatStart } from "../repeat";

@customElement("repeat-start-test")
class RepeatStartTest extends LitElement {
  @property()
  measure: Measure = new Measure("A");

  render(): unknown {
    return lit_html`${repeatStart(this.measure)}`;
  }
}

@customElement("repeat-end-test")
class RepeatEndTest extends LitElement {
  @property()
  measure: Measure = new Measure("A");

  render(): unknown {
    return lit_html`${repeatEnd(this.measure)}`;
  }
}

describe("part render", () => {
  it("start is defined", async () => {
    const el = await fixture(html`<repeat-start-test .measure="${new Measure("A")}"></repeat-start-test>`);
    expect(el).to.be.instanceOf(RepeatStartTest);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  it("start is defined with repeat", async () => {
    const el = await fixture(html`<repeat-start-test .measure="${new Measure(": A")}"></repeat-start-test>`);
    expect(el).to.be.instanceOf(RepeatStartTest);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal('<div class="grid-measure-repeat-left"><span>∶</span></div>');
  });

  it("end is defined", async () => {
    const el = await fixture(html`<repeat-end-test .measure="${new Measure("A")}"></repeat-end-test>`);
    expect(el).to.be.instanceOf(RepeatEndTest);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  it("end is defined with repeat", async () => {
    const el = await fixture(html`<repeat-end-test .measure="${new Measure("A :")}"></repeat-end-test>`);
    expect(el).to.be.instanceOf(RepeatEndTest);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal('<div class="grid-measure-repeat-right"><span>∶</span></div>');
  });
});
