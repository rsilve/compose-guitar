import { expect, fixture, html } from '@open-wc/testing';
import ComposeNotification from '../compose-notification';
import { state_test } from '../../../../__tests__/TestHelpers';
import { reset_dispatcher } from '../../../../stores/dispatcher';

suite('compose-notification element', () => {
  const st = state_test;

  test('is defined', async () => {
    const el: ComposeNotification = await fixture(html`
            <compose-notification></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <ul></ul>        
        `);
  });

  test('with message', async () => {
    reset_dispatcher({ ...st, notification: 'test' });
    const el: ComposeNotification = await fixture(html`
            <compose-notification></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
 <ul><li>test</li></ul>        
        `);
  });

  test('with message after timeout', async () => {
    reset_dispatcher({ ...st, notification: 'test' });
    const el: ComposeNotification = await fixture(html`
            <compose-notification delay="100"></compose-notification> `);
    expect(el).to.instanceOf(ComposeNotification);
    await expect(el).shadowDom.to.be.accessible();
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    await promise;
    expect(el).shadowDom.to.be.equal(`
 <ul></ul>        
        `);
  });
});
