import { expect, fixture, html } from '@open-wc/testing';
import ConfirmSave from '../ConfirmSave';

suite('Confirm save element', () => {
  test('is defined', async () => {
    const el: ConfirmSave = await fixture(html`
            <confirm-save></confirm-save> `);
    expect(el).to.instanceOf(ConfirmSave);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
<p>Some changes have not been recorded. Do you want to continue anyway?</p>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-secondary _cancel">Cancel</button>
                <button tabindex="-1" class="btn-secondary _continue">Continue</button>
                <button class="_save">Save and continue</button>
            </div>        
        `);
  });

  test('cancel event', async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === 'cancel';
    };
    const el: ConfirmSave = await fixture(html`
            <confirm-save @cancel="${handler}"></confirm-save> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector('._cancel') as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });

  test('continue event', async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === 'continue';
    };
    const el: ConfirmSave = await fixture(html`
            <confirm-save @continue="${handler}"></confirm-save> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector('._continue') as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });

  test('save event', async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === 'save';
    };
    const el: ConfirmSave = await fixture(html`
            <confirm-save @save="${handler}"></confirm-save> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector('._save') as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });
});
