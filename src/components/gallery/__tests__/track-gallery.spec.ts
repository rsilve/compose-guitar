import { expect, fixture, html } from "@open-wc/testing";
import TrackGallery from "../TrackGallery";
import sinon from "sinon";
import { register, resetDispatcher } from "../../../lib/dispatcher";
import { GALLERY_CLOSE, GALLERY_REMOVE, UPLOAD_FROM_GALLERY } from "../actions";
import { storage } from "../../../lib/gallery_tools";

describe("Track gallery element", () => {
  const stub = sinon.stub(storage);

  it("is defined", async () => {
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    expect(el).to.instanceOf(TrackGallery);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("default render", async () => {
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;

    expect(node.childElementCount).to.be.equal(0);
  });

  it("render list", async () => {
    stub.galleryDictExtended.returns({
      "1": { title: "1", synchronized: false },
      "2": { title: "2", synchronized: false },
    });
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;
    expect(node.childElementCount).to.be.equal(2);
    let label = node.children[0]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("1");
    label = node.children[1]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("2");
  });

  it("render list with sync state", async () => {
    stub.galleryDictExtended.returns({
      "1": { title: "1", synchronized: true },
      "2": { title: "2", synchronized: false },
    });
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;
    expect(node.childElementCount).to.be.equal(2);
    let label = node.children[0]?.querySelector("span") as HTMLElement;
    expect(label).lightDom.to.be.equal(`1<span class="cloud">☁</span>`);
    label = node.children[1]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("2");
  });

  it("close event", async () => {
    resetDispatcher();
    let handled = false;
    register((action, state) => {
      handled = action.actionType === GALLERY_CLOSE;
      return Promise.resolve(state);
    });
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._close") as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });

  it("select event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === UPLOAD_FROM_GALLERY);
        return Promise.resolve(state);
      });
    });

    stub.galleryDictExtended.returns({
      "1": { title: "1", synchronized: true },
    });
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._select") as HTMLElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });

  it("remove event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === GALLERY_REMOVE);
        return Promise.resolve(state);
      });
    });
    stub.galleryDictExtended.returns({
      "1": { title: "1", synchronized: true },
    });
    const el: TrackGallery = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._remove") as HTMLElement;
    node.click();
    await el.updateComplete;
    const confirm = el.shadowRoot?.querySelector("._confirm_remove") as HTMLElement;
    expect(confirm).to.not.be.null;
    confirm.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });
});
