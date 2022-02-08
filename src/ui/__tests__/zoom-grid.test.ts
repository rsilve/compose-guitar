import { fixture, html, expect, fixtureCleanup } from "@open-wc/testing";
import ZoomGrid from "../zoom-grid";
import { register, resetDispatcher } from "../../stores/dispatcher";
import { zoom_change_callback } from "../../stores/register/misc";

suite("Zoom grid element", () => {
  test("is defined", async () => {
    const el: ZoomGrid = await fixture(html` <zoom-grid></zoom-grid> `);
    expect(el).to.instanceOf(ZoomGrid);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("renders with default values", async () => {
    const el: ZoomGrid = await fixture(html` <zoom-grid></zoom-grid>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el._zoom).to.equal(100);
    await expect(el).shadowDom.to.equal(
      `<div class="pill zoom_in" title="Zoom in - Atl++/Alt+=" ontouchstart="">+</div>
             <div class="pill zoom_out" title="Zoom out - Alt+-" ontouchstart="">-</div>
             <div class="text">100%</div>`
    );
  });

  test("click zoom in", async () => {
    register(zoom_change_callback);
    const el: ZoomGrid = await fixture(html` <zoom-grid></zoom-grid>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el.shadowRoot).to.be.not.null;
    const node = el.shadowRoot?.querySelector(".zoom_in") as HTMLElement;
    node.click();
    await el.updateComplete;
    expect(el._zoom).to.equal(110);
    await el.updateComplete;
    await expect(el).shadowDom.to.equal(
      `<div class="pill zoom_in" title="Zoom in - Atl++/Alt+=" ontouchstart="">+</div>
             <div class="pill zoom_out" title="Zoom out - Alt+-" ontouchstart="">-</div>
             <div class="text">110%</div>`
    );
    fixtureCleanup();
  });

  test("click zoom out", async () => {
    resetDispatcher();
    register(zoom_change_callback);
    const el: ZoomGrid = await fixture(html` <zoom-grid></zoom-grid>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector(".zoom_out") as HTMLElement;
    node.click();
    await el.updateComplete;
    expect(el._zoom).to.equal(90);
    await el.updateComplete;
    await expect(el).shadowDom.to.equal(
      `<div class="pill zoom_in" title="Zoom in - Atl++/Alt+=" ontouchstart="">+</div>
             <div class="pill zoom_out" title="Zoom out - Alt+-" ontouchstart="">-</div>
             <div class="text">90%</div>`
    );
  });
});
