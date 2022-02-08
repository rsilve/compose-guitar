import { expect, fixture, fixtureCleanup, html } from "@open-wc/testing";
import TransposeGrid from "../TransposeGrid";
import { register, resetDispatcher } from "../../stores/dispatcher";
import { transpose_change_callback } from "../../stores/register/misc";

suite("transpose element", () => {
  test("is defined", async () => {
    const el: TransposeGrid = await fixture(html` <transpose-grid></transpose-grid>s`);
    expect(el).to.instanceOf(TransposeGrid);
    await expect(el).shadowDom.to.be.accessible();
    await expect(el).shadowDom.to.equal(
      `<label title="transpose">
                <input type="range" min="-11" max="11" >
                <div>0 tone</div>
            </label>`
    );
    expect(el.transpose).to.equal(0);
  });

  test("change", async () => {
    resetDispatcher();
    register(transpose_change_callback);
    const el: TransposeGrid = await fixture(html` <transpose-grid></transpose-grid>s`);
    expect(el).to.instanceOf(TransposeGrid);
    const node = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    node.value = "1";
    const event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    node.dispatchEvent(event);
    expect(el.transpose).to.equal(1);
    fixtureCleanup();
  });
});
