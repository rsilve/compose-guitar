import { expect, fixture, html } from "@open-wc/testing";
import MainScreen from "../main-screen";
import { state_test } from "../../__tests__/TestHelpers";
import { reset_dispatcher } from "../../stores/dispatcher";

suite("Main screen element", () => {
  const st = state_test;

  test("is defined", async () => {
    const el: MainScreen = await fixture(html` <main-screen></main-screen> `);
    expect(el).to.instanceOf(MainScreen);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <app-on-boarding></app-on-boarding>
        `);
  });

  test("with track", async () => {
    reset_dispatcher({ ...st, track: { title: "title", grid_text: "A" } });
    const el: MainScreen = await fixture(html` <main-screen></main-screen> `);
    expect(el).to.instanceOf(MainScreen);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
           <app-main-preview
                        zoom="100"
                        song_title="title"
                        song_grid="A" transpose="0"></app-main-preview>
        `);
  });

  test("with zoom", async () => {
    reset_dispatcher({
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
                        song_title="title"
                        song_grid="A" transpose="0"></app-main-preview>
        `);
  });
});
