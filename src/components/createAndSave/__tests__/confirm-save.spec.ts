import { expect, fixture, html } from "@open-wc/testing";
import ConfirmSave from "../ConfirmSave";
import { register } from "../../../lib/dispatcher";
import { SAVE_AS_START_AND_NEW, TRACK_NEW_CANCEL, TRACK_NEW_WITHOUT_SAVE } from "../actions";

describe("Confirm save element", () => {
  it("is defined", async () => {
    const el: ConfirmSave = await fixture(html` <confirm-save></confirm-save> `);
    expect(el).to.instanceOf(ConfirmSave);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
<p>Some changes have not been recorded. Do you want to continue anyway?</p>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-secondary _cancel" ontouchstart="">Cancel</button>
                <button tabindex="-1" class="btn-secondary _continue" ontouchstart="">Continue</button>
                <button class="_save" ontouchstart="">Save and continue</button>
            </div>        
        `);
  });

  it("cancel event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === TRACK_NEW_CANCEL);
        return Promise.resolve(state);
      });
    });
    const el: ConfirmSave = await fixture(html` <confirm-save></confirm-save> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._cancel") as HTMLElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });

  it("continue event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === TRACK_NEW_WITHOUT_SAVE);
        return Promise.resolve(state);
      });
    });
    const el: ConfirmSave = await fixture(html` <confirm-save></confirm-save> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._continue") as HTMLElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });

  it("save event", async () => {
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === SAVE_AS_START_AND_NEW);
        return Promise.resolve(state);
      });
    });
    const el: ConfirmSave = await fixture(html` <confirm-save></confirm-save> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._save") as HTMLElement;
    node.click();
    const handled = await promise;
    expect(handled).to.be.true;
  });
});
