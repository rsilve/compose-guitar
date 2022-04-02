import { expect, fixture, html } from "@open-wc/testing";
import HelpModal from "../HelpModal";
import { register } from "../../../stores/dispatcher";
import { HELP_CLOSE } from "../actions";
import { SYNCHRO_TOGGLE_ENABLED } from "../../../actions/actions";

describe("Help Modal element", () => {
  it("is defined", async () => {
    const el: HelpModal = await fixture(html` <help-modal></help-modal> `);
    expect(el).to.instanceOf(HelpModal);
    await expect(el).shadowDom.to.be.accessible();
  });

  it("close event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === HELP_CLOSE);
        return Promise.resolve(state);
      });
    });
    const el: HelpModal = await fixture(html` <help-modal></help-modal> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._close") as HTMLElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });

  it("toggle sync event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SYNCHRO_TOGGLE_ENABLED);
        return Promise.resolve(state);
      });
    });

    const el: HelpModal = await fixture(html` <help-modal></help-modal> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("[data-testid=featureSynchronizationEnabled]") as HTMLInputElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });
});
