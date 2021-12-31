import { expect, fixture, html } from "@open-wc/testing";
import Modals from "../Modals";
import { register, reset_dispatcher } from "../../../stores/dispatcher";
import { state_test } from "../../../__tests__/TestHelpers";
import {
  SYNCHRO_ACTIVATION,
  SYNCHRO_CONFIGURATION_CLOSE,
  SYNCHRO_DEACTIVATION,
  SYNCHRO_FORCE,
  SYNCHRO_FORCE_START,
  SYNCHRO_SIGN_OUT,
} from "../../../actions/actions";

suite("Modals element", () => {
  const st = state_test;

  test("is defined", async () => {
    reset_dispatcher({ ...st });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal("");
  });

  test("open gallery", async () => {
    reset_dispatcher({ ...st, gallery: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <track-gallery class="modal"></track-gallery>`);
  });

  test("open editor", async () => {
    reset_dispatcher({ ...st, editor: {} });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <song-editor class="modal"></song-editor>`);
  });

  test("open help", async () => {
    reset_dispatcher({ ...st, help_open: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <help-modal class="modal"></help-modal>`);
  });

  test("confirm save", async () => {
    reset_dispatcher({ ...st, confirm_save: true });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <confirm-save class="modal"></confirm-save>`);
  });

  test("synchronize activation", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, open: true } });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    expect(el.synchronizationConfigurationOpen).to.be.true;
    expect(el.synchronization?.enabled).to.be.true;
    expect(el.synchronization?.open).to.be.true;
    expect(el).shadowDom.to.be.equal(`
        <div class="overlay"></div>
        <synchronize-configuration class="modal"></synchronize-configuration>`);
  });

  test("synchronize configuration close", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, open: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_CONFIGURATION_CLOSE);
        return Promise.resolve(state);
      });
    });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("synchronize-configuration");
    node?.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
      })
    );
    const closed = await promise;
    expect(closed).to.be.true;
  });

  test("synchronize activation", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: false, open: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_ACTIVATION);
        return Promise.resolve(state);
      });
    });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("synchronize-configuration");
    node?.dispatchEvent(
      new CustomEvent("activate", {
        bubbles: true,
        composed: true,
      })
    );
    const closed = await promise;
    expect(closed).to.be.true;
  });

  test("synchronize deactivation", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, open: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_DEACTIVATION);
        return Promise.resolve(state);
      });
    });
    const el: Modals = await fixture(html` <compose-modals></compose-modals> `);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("synchronize-configuration");
    node?.dispatchEvent(
      new CustomEvent("deactivate", {
        bubbles: true,
        composed: true,
      })
    );
    const closed = await promise;
    expect(closed).to.be.true;
  });

  test("synchronize sign out", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, open: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === SYNCHRO_SIGN_OUT) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });
    const el: Modals = await fixture(html` <compose-modals></compose-modals>`);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("synchronize-configuration");
    node?.dispatchEvent(
      new CustomEvent("deactivate", {
        bubbles: true,
        composed: true,
      })
    );
    const closed = await promise;
    expect(closed).to.be.true;
  });

  test("force synchronize start", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, open: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === SYNCHRO_FORCE_START) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });
    const el: Modals = await fixture(html` <compose-modals></compose-modals>`);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("synchronize-configuration");
    node?.dispatchEvent(
      new CustomEvent("synchronize", {
        bubbles: true,
        composed: true,
      })
    );
    const closed = await promise;
    expect(closed).to.be.true;
  });

  test("force synchronize", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true, open: true } });
    const promise = new Promise((resolve) => {
      register((action, state) => {
        if (action.action_type === SYNCHRO_FORCE) {
          resolve(true);
        }
        return Promise.resolve(state);
      });
    });
    const el: Modals = await fixture(html` <compose-modals></compose-modals>`);
    expect(el).to.instanceOf(Modals);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("synchronize-configuration");
    node?.dispatchEvent(
      new CustomEvent("synchronize", {
        bubbles: true,
        composed: true,
      })
    );
    const closed = await promise;
    expect(closed).to.be.true;
  });
});
