import { expect, fixture, html } from "@open-wc/testing";
import SynchronizationConfigurationDeactivated from "../SynchronizationConfigurationDeactivated";
import { register } from "../../../lib/dispatcher";
import { SYNCHRO_ACTIVATION } from "../actions";

describe("synchronise configuration deactivate element", () => {
  it("is defined", async () => {
    const el: SynchronizationConfigurationDeactivated = await fixture(
      html`<synchronization-configuration-deactivated></synchronization-configuration-deactivated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationDeactivated);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("has an activate button", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_ACTIVATION);
        return Promise.resolve(state);
      });
    });
    const el: SynchronizationConfigurationDeactivated = await fixture(
      html` <synchronization-configuration-deactivated></synchronization-configuration-deactivated>`
    );
    expect(el).to.instanceOf(SynchronizationConfigurationDeactivated);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._activate") as HTMLElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });
});
