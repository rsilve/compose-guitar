import { expect, fixture, html } from "@open-wc/testing";
import ConfirmSave from "../ConfirmSave";
import TrackGallery from "../TrackGallery";

describe("Track gallery element", () => {
  it("is defined", async () => {
    const el: ConfirmSave = await fixture(html` <track-gallery></track-gallery>`);
    expect(el).to.instanceOf(TrackGallery);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("default render", async () => {
    const el: ConfirmSave = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;

    expect(node.childElementCount).to.be.equal(0);
  });

  it("render list", async () => {
    const list = [
      { title: "1", synchronized: false },
      { title: "2", synchronized: false },
    ];
    const el: ConfirmSave = await fixture(html` <track-gallery .list="${list}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;
    expect(node.childElementCount).to.be.equal(2);
    let label = node.children[0]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("1");
    label = node.children[1]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("2");
  });

  it("render list with sync state", async () => {
    const list = [
      { title: "1", synchronized: true },
      { title: "2", synchronized: false },
    ];
    const el: ConfirmSave = await fixture(html` <track-gallery .list="${list}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;
    expect(node.childElementCount).to.be.equal(2);
    let label = node.children[0]?.querySelector("span") as HTMLElement;
    expect(label).lightDom.to.be.equal(`1<span class="cloud">☁</span>`);
    label = node.children[1]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("2");
  });

  it("close event", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === "close";
    };
    const el: ConfirmSave = await fixture(html` <track-gallery @close="${handler}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._close") as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });

  it("select event", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === "select" && e.detail.id === "1";
    };
    const list = { 1: "title" };
    const el: ConfirmSave = await fixture(html` <track-gallery @select="${handler}" .list="${list}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._select") as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });

  it("remove event", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === "remove" && e.detail.id === "1";
    };
    const list = { 1: "title" };
    const el: ConfirmSave = await fixture(html` <track-gallery @remove="${handler}" .list="${list}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._remove") as HTMLElement;
    node.click();
    await el.updateComplete;
    const confirm = el.shadowRoot?.querySelector("._confirm_remove") as HTMLElement;
    expect(confirm).to.not.be.null;
    confirm.click();
    expect(handled).to.be.true;
  });
});
