import { expect, fixture, html } from "@open-wc/testing";
import GoogleAPI from "../GoogleAPI";
import { register, reset_dispatcher } from "../../../stores/dispatcher";
import { state_test } from "../../../__tests__/TestHelpers";
import { SYNCHRO_SIGN_IN } from "../../../actions/actions";

suite("google-api element", () => {
  const st = state_test;

  test("is defined", async () => {
    reset_dispatcher({ ...st });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    expect(el).to.instanceOf(GoogleAPI);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("not contains script", async () => {
    reset_dispatcher({ ...st });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const url = "https://apis.google.com/js/api.js";
    expect(el.shadowRoot?.innerHTML).to.not.contains(`<script src="${url}" crossorigin="anonymous"></script>`);
  });

  test("contains script", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const url = "https://apis.google.com/js/api.js";
    expect(el.shadowRoot?.innerHTML).to.contains(`<script src="${url}" crossorigin="anonymous"></script>`);
  });

  test("action on script load", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_SIGN_IN);
        return Promise.resolve(state);
      });
    });
    const el: GoogleAPI = await fixture(html` <google-api></google-api>`);
    await expect(el).shadowDom.to.be.accessible();
    const loaded = await promise;
    expect(loaded).to.be.true;
  });
});
