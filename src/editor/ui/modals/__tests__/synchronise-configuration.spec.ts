import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeConfiguration from "../SynchronizeConfiguration";
import { register } from "../../../../stores/dispatcher";
import { SYNCHRO_ACTIVATION, SYNCHRO_DEACTIVATION } from "../../../actions/actions";

suite("synchronise configuration element", () => {
  test("is defined", async () => {
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
  });

  test("have a close button", async () => {
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
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el.enabled).to.be.false;
    expect(el).shadowDom.to.equals(`
            <h1>Synchronization</h1>
            <div>Do you want to activate synchronization ? <button class="_activate">activate</button></div>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close">Close</button>
            </div>
        `);
  });

  test("has a enabled attribute", async () => {
    const el: SynchronizeConfiguration = await fixture(
      html` <synchronize-configuration .enabled="${true}"></synchronize-configuration>`
    );
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el.enabled).to.be.true;
    expect(el).shadowDom.to.equals(`
            <h1>Synchronization</h1>
            <div>Do you want to deactivate synchronization ? <button class="_deactivate">deactivate</button></div>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close">Close</button>
            </div>
        `);
  });

  test("has an activation button", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_ACTIVATION);
        return Promise.resolve(state);
      });
    });
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._activate") as HTMLElement;
    node.click();
    const activated = await promise;
    expect(activated).to.be.true;
  });

  test("ha a deactivate button", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.action_type === SYNCHRO_DEACTIVATION);
        return Promise.resolve(state);
      });
    });
    const el: SynchronizeConfiguration = await fixture(
      html` <synchronize-configuration .enabled="${true}"></synchronize-configuration>`
    );
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._deactivate") as HTMLElement;
    node.click();
    const activated = await promise;
    expect(activated).to.be.true;
  });
});
