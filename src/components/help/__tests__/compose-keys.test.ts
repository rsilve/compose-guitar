import { expect, fixture, fixtureCleanup, html } from "@open-wc/testing";
import ComposeKeys from "../compose-keys";
import { zoomChangeCallback } from "../../zoom/store";
import { galleryCallback } from "../../gallery/store";
import { helpCallback } from "../store";
import { stateTest } from "../../../__tests__/TestHelpers";
import { connect, register, resetDispatcher } from "../../../lib/dispatcher";
import { IState, IStateTrack } from "../../../lib/state";
import { songEditCallback } from "../../song/store";
import { createAndSaveCallback } from "../../createAndSave/store";

describe("compose-key element", () => {
  const st = stateTest;

  it("is defined", async () => {
    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <help-icon title="Shortcut help"></help-icon>  
        `);
    fixtureCleanup();
  });

  it("add edit_key event", async () => {
    resetDispatcher(st);
    register(songEditCallback);
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.editor);
      });
    });

    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    const e = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "e",
    });
    document.dispatchEvent(e);
    await promise.then((value) => expect(value).to.not.be.undefined);
    fixtureCleanup();
  });

  it("add save_as_start event", async () => {
    resetDispatcher(st);
    register(createAndSaveCallback);
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.track);
      });
    });

    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    const e = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "s",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      const tr = value as IStateTrack;
      expect(tr.saved_at).to.not.be.undefined;
    });
    fixtureCleanup();
  });

  it("add gallery_open event", async () => {
    resetDispatcher(st);
    register(galleryCallback);
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.gallery);
      });
    });

    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    const e = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "l",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.be.true;
    });
    fixtureCleanup();
  });

  it("add track_new event", async () => {
    resetDispatcher(st);
    register(createAndSaveCallback);
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.editor);
      });
    });

    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    const e = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "n",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.not.be.undefined;
    });
    fixtureCleanup();
  });

  it("zoom_incr event", async () => {
    resetDispatcher(st);
    register(zoomChangeCallback);
    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).dom.to.be.accessible();
    await expect(el).shadowDom.to.be.accessible();
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.zoom);
      });
    });
    const e = new KeyboardEvent("keydown", {
      altKey: true,
      key: "+",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.be.equal(110);
    });
    fixtureCleanup();
  });

  it("zoom_incr event 2", async () => {
    resetDispatcher(st);
    register(zoomChangeCallback);
    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    await expect(el).dom.to.be.accessible();
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.zoom);
      });
    });
    const e = new KeyboardEvent("keydown", {
      altKey: true,
      key: "≠",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.be.equal(110);
    });
    fixtureCleanup();
  });

  it("zoom_decr event", async () => {
    resetDispatcher(st);
    register(zoomChangeCallback);
    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    await expect(el).dom.to.be.accessible();
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.zoom);
      });
    });
    const e = new KeyboardEvent("keydown", {
      altKey: true,
      key: "-",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.be.equal(90);
    });
    fixtureCleanup();
  });

  it("zoom_decr event 2", async () => {
    resetDispatcher(st);
    register(zoomChangeCallback);
    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    await expect(el).dom.to.be.displayed;
    const promise = new Promise((resolve) => {
      connect((state: IState) => {
        resolve(state.zoom);
      });
    });
    const e = new KeyboardEvent("keydown", {
      altKey: true,
      key: "—",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.be.equal(90);
    });
    fixtureCleanup();
  });

  it("esc event", async () => {
    resetDispatcher(st);
    register(helpCallback);
    const promise = new Promise((resolve) => {
      connect(() => {
        resolve(true);
      });
    });

    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    await expect(el).dom.to.be.accessible();
    const e = new KeyboardEvent("keydown", {
      key: "Escape",
    });
    document.dispatchEvent(e);
    await promise.then((value) => {
      expect(value).to.be.true;
    });
    fixtureCleanup();
  });
});
