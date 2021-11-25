import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeConfiguration from "../SynchronizeConfiguration";
import {register, reset_dispatcher} from "../../../../stores/dispatcher";
import { state_test } from "../../../../__tests__/TestHelpers";
import {SYNCHRO_ACTIVATION, SYNCHRO_DEACTIVATION} from "../../../actions/actions";

suite("synchronise configuration element", () => {
  const st = state_test;

  test("is defined", async () => {
    reset_dispatcher();
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("have a close button", async () => {
    reset_dispatcher();
    let handle_close = false;
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration
      @close="${() => (handle_close = true)}"
    ></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._close") as HTMLElement;
    expect(node).to.not.be.null;
    node.click();
    expect(handle_close).to.be.true;
  });

  test("has default state", async () => {
    reset_dispatcher();
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el._enabled).to.be.false;
    expect(el).shadowDom.to.equals(`
            <div>Do you want to activate synchronization ? <button class="_activate">activate</button></div>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close">Close</button>
            </div>
        `);
  });

  test("listen store", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el._enabled).to.be.true;
    expect(el).shadowDom.to.equals(`
            <div>Do you want to deactivate synchronization ? <button class="_deactivate">deactivate</button></div>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close">Close</button>
            </div>
        `);
  });

  test("has an activation button", async () => {
    reset_dispatcher();
    const promise = new Promise(resolve => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_ACTIVATION);
        return Promise.resolve(state);
      });
    })
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._activate") as HTMLElement;
    node.click();
    const activated = await promise;
    expect(activated).to.be.true
  });

  test("ha a deactivate button", async () => {
    reset_dispatcher({ ...st, synchronization: { enabled: true } });
    const promise = new Promise(resolve => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_DEACTIVATION);
        return Promise.resolve(state);
      });
    })
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._deactivate") as HTMLElement;
    node.click();
    const activated = await promise;
    expect(activated).to.be.true
  });


});
