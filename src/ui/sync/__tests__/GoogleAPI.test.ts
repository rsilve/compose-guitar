import { expect, fixture, html } from "@open-wc/testing";
import GoogleAPI from "../GoogleAPI";
import { register, resetDispatcher } from "../../../stores/dispatcher";
import { stateTest } from "../../../__tests__/TestHelpers";
import { SYNCHRO_FORCE, SYNCHRO_FORCE_START, SYNCHRO_SIGN_IN } from "../../../actions/actions";

describe("google-api element", () => {
  const st = stateTest;

  it("is defined", async () => {
    resetDispatcher({ ...st });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    expect(el).to.instanceOf(GoogleAPI);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("not contains script", async () => {
    resetDispatcher({ ...st });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const url = "https://apis.google.com/js/api.js";
    expect(el.shadowRoot?.innerHTML).to.not.contains(`<script src="${url}" crossorigin="anonymous"></script>`);
  });

  it("contains script", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const url = "https://apis.google.com/js/api.js";
    expect(el.shadowRoot?.innerHTML).to.contains(`<script src="${url}" crossorigin="anonymous"></script>`);
  });

  it("action on script load", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_SIGN_IN);
        return Promise.resolve(state);
      });
    });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const loaded = await promise;
    expect(loaded).to.be.true;
  });

  it("synchro start on script load", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.actionType === SYNCHRO_FORCE_START) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const loaded = await promise;
    expect(loaded).to.be.true;
  });

  it("synchro on script load", async () => {
    resetDispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.actionType === SYNCHRO_FORCE) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const loaded = await promise;
    expect(loaded).to.be.true;
  });
});
