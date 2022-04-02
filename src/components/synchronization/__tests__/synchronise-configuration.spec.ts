import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeConfiguration from "../SynchronizeConfiguration";
import { IStateSynchronization } from "../../../stores/state";
import { register } from "../../../stores/dispatcher";
import { SYNCHRO_CONFIGURATION_CLOSE } from "../actions";

describe("synchronise configuration element", () => {
  it("is defined", async () => {
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("have a close button", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_CONFIGURATION_CLOSE);
        return Promise.resolve(state);
      });
    });
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._close") as HTMLElement;
    expect(node).to.not.be.null;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });

  it("has default (deactivate) state", async () => {
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el.synchronization).to.be.undefined;
    expect(el).shadowDom.to.equals(`
            <h1>Synchronization</h1>
            <synchronization-configuration-deactivated></synchronization-configuration-deactivated>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close" ontouchstart="">Close</button>
            </div>
        `);
  });

  it("has a enabled attribute", async () => {
    const sync: IStateSynchronization = { enabled: true, signInValid: true };
    const el: SynchronizeConfiguration = await fixture(
      html` <synchronize-configuration .synchronization="${sync}"></synchronize-configuration>`
    );
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <h1>Synchronization</h1>
            <synchronization-configuration-activated></synchronization-configuration-activated>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close" ontouchstart="">Close</button>
            </div>
        `);
  });
});
