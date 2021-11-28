import { expect, fixture, html } from "@open-wc/testing";
import SynchronizeConfiguration from "../SynchronizeConfiguration";
import { IStateSynchronisation } from "../../../stores/state";

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

  test("has default (deactivate) state", async () => {
    const el: SynchronizeConfiguration = await fixture(html` <synchronize-configuration></synchronize-configuration>`);
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el.synchronisation).to.be.undefined;
    expect(el).shadowDom.to.equals(`
            <h1>Synchronization</h1>
            <synchronize-configuration-deactivate></synchronize-configuration-deactivate>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close">Close</button>
            </div>
        `);
  });

  test("has a enabled attribute", async () => {
    const sync: IStateSynchronisation = { enabled: true, signInValid: true };
    const el: SynchronizeConfiguration = await fixture(
      html` <synchronize-configuration .synchronisation="${sync}"></synchronize-configuration>`
    );
    expect(el).to.instanceOf(SynchronizeConfiguration);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.equals(`
            <h1>Synchronization</h1>
            <synchronize-configuration-activate></synchronize-configuration-activate>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close">Close</button>
            </div>
        `);
  });


});
