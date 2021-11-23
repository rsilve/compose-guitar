import { expect } from '@open-wc/testing';
import { uuid } from '../uuid';

suite('uuid', () => {
  test('generate', () => {
    const uuid1 = uuid();
    expect(uuid1).to.not.be.null;
    expect(uuid1).to.not.be.empty;

    const uuid2 = uuid();
    expect(uuid2.length).to.be.equal(36);
    expect(uuid2).to.not.be.equal(uuid1);
  });
});
