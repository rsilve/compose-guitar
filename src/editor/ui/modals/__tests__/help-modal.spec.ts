import { expect, fixture, html } from '@open-wc/testing';
import ConfirmSave from '../ConfirmSave';
import HelpModal from '../HelpModal';

suite('Help Modal element', () => {
  test('is defined', async () => {
    const el: ConfirmSave = await fixture(html`
            <help-modal></help-modal> `);
    expect(el).to.instanceOf(HelpModal);
    await expect(el).shadowDom.to.be.accessible();
  });

  test('close event', async () => {
    let handled = false;
    const handler = (e: CustomEvent) => {
      handled = e.type === 'close';
    };
    const el: ConfirmSave = await fixture(html`
            <help-modal @close="${handler}"></help-modal> `);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector('._close') as HTMLElement;
    node.click();
    expect(handled).to.be.true;
  });
});
