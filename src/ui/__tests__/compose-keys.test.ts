import { expect, fixture, fixtureCleanup, html } from "@open-wc/testing";
import ComposeKeys from "../compose-keys";
import { connect, register, resetDispatcher } from "../../stores/dispatcher";
import { track_callback } from "../../stores/register/track";
import { IState, IStateTrack } from "../../stores/state";
import { stateTest } from "../../__tests__/TestHelpers";
import { save_as_callback } from "../../stores/register/save_as";
import { gallery_callback } from "../../stores/register/gallery";
import { zoom_change_callback } from "../../stores/register/misc";
import { helpCallback } from "../../stores/register/help";

suite("compose-key element", () => {
  const st = stateTest;

  test("is defined", async () => {
    const el: ComposeKeys = await fixture(html` <compose-keys></compose-keys> `);
    expect(el).to.instanceOf(ComposeKeys);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <help-icon title="Shortcut help"></help-icon>  
        `);
    fixtureCleanup();
  });

  test("add edit_key event", async () => {
    resetDispatcher(st);
    register(track_callback);
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

  test("add save_as_start event", async () => {
    resetDispatcher(st);
    register(save_as_callback);
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

  test("add gallery_open event", async () => {
    resetDispatcher(st);
    register(gallery_callback);
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

  test("add track_new event", async () => {
    resetDispatcher(st);
    register(track_callback);
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

  test("zoom_incr event", async () => {
    resetDispatcher(st);
    register(zoom_change_callback);
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

  test("zoom_incr event 2", async () => {
    resetDispatcher(st);
    register(zoom_change_callback);
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

  test("zoom_decr event", async () => {
    resetDispatcher(st);
    register(zoom_change_callback);
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

  test("zoom_decr event 2", async () => {
    resetDispatcher(st);
    register(zoom_change_callback);
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

  test("esc event", async () => {
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
