import { expect, fixture, html } from "@open-wc/testing";
import ConfirmSave from "../ConfirmSave";
import TrackGallery from "../TrackGallery";

suite("Track gallery element", () => {
  test("is defined", async () => {
    const el: ConfirmSave = await fixture(html` <track-gallery></track-gallery>`);
    expect(el).to.instanceOf(TrackGallery);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("default render", async () => {
    const el: ConfirmSave = await fixture(html` <track-gallery></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;

    expect(node.childElementCount).to.be.equal(0);
  });

  test("render list", async () => {
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

  test("render list with sync state", async () => {
    const list = [
      { title: "1", synchronized: true },
      { title: "2", synchronized: false },
    ];
    const el: ConfirmSave = await fixture(html` <track-gallery .list="${list}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    //expect(el).shadowDom.to.be.equal("1");
    const node = el.shadowRoot?.querySelector("ul") as HTMLElement;
    expect(node.childElementCount).to.be.equal(2);
    let label = node.children[0]?.querySelector("span") as HTMLElement;
    expect(label).lightDom.to.be.equal(`1<span class="cloud">☁</span>`);
    label = node.children[1]?.querySelector("span") as HTMLElement;
    expect(label.innerText).to.be.equal("2");
  });

  test("close event", async () => {
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

  test("select event", async () => {
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

  test("remove event", async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === "remove" && e.detail.id === "1";
    };
    const list = { 1: "title" };
    const el: ConfirmSave = await fixture(html` <track-gallery @remove="${handler}" .list="${list}"></track-gallery>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._remove") as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });
});
