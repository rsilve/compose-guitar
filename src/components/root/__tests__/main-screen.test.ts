import { expect, fixture, html } from "@open-wc/testing";
import MainScreen from "../main-screen";
import { stateTest } from "../../../__tests__/TestHelpers";
import { resetDispatcher } from "../../../lib/dispatcher";

describe("Main screen element", () => {
  const st = stateTest;

  it("is defined", async () => {
    const el: MainScreen = await fixture(html` <main-screen></main-screen> `);
    expect(el).to.instanceOf(MainScreen);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <app-on-boarding></app-on-boarding>
        `);
  });

  it("with track", async () => {
    resetDispatcher({ ...st, track: { title: "title", grid_text: "A" } });
    const el: MainScreen = await fixture(html` <main-screen></main-screen> `);
    expect(el).to.instanceOf(MainScreen);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
           <app-main-preview
                        zoom="100"
                        songTitle="title"
                        songGrid="A" transpose="0"></app-main-preview>
        `);
  });

  it("with zoom", async () => {
    resetDispatcher({
      ...st,
      track: { title: "title", grid_text: "A" },
      zoom: 50,
    });

    const el: MainScreen = await fixture(html` <main-screen></main-screen> `);
    expect(el).to.instanceOf(MainScreen);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
           <app-main-preview
                        zoom="50"
                        songTitle="title"
                        songGrid="A" transpose="0"></app-main-preview>
        `);
  });
});
