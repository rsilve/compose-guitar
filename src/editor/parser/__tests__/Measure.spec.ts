import { expect } from '@open-wc/testing';
import Chord from '../Chord';
import Measure from '../Measure';

suite('Parse measure', () => {
  test('Parse invalid', () => {
    const measure = new Measure('A B C D E');
    expect(measure.raw).to.be.equal('A B C D E');
    expect(measure.chords).to.deep.equal([]);
    expect(measure.valid).to.be.false;
  });

  test('Parse invalid chord_render', () => {
    const measure = new Measure('R');
    expect(measure.raw).to.be.equal('R');
    expect(measure.chords).to.deep.equal([new Chord('R', 4)]);
    expect(measure.valid).to.be.false;
  });

  test('Parse simple', () => {
    const measure = new Measure('A');
    expect(measure.raw).to.be.equal('A');
    expect(measure.chords).to.deep.equal([new Chord('A', 4)]);
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });

  test('Parse multiple', () => {
    const measure = new Measure(' A B C D');
    expect(measure.raw).to.be.equal('A B C D');
    expect(measure.chords).to.deep.equal([
      new Chord('A'), new Chord('B'),
      new Chord('C'), new Chord('D'),
    ]);
    expect(measure.valid).to.be.true;
  });

  test('Parse measure type 1', () => {
    const measure = new Measure('A');
    expect(measure.type).to.be.equal(1);
  });

  test('Parse measure type 2', () => {
    const measure = new Measure('A B _ _');
    expect(measure.type).to.be.equal(2);
  });

  test('Parse measure type 3', () => {
    const measure = new Measure('A B');
    expect(measure.type).to.be.equal(3);
  });

  test('Parse measure type 3 bis', () => {
    const measure = new Measure('A _ B');
    expect(measure.type).to.be.equal(3);
  });

  test('Parse measure type 4', () => {
    const measure = new Measure('A _ _ B');
    expect(measure.type).to.be.equal(4);
  });

  test('Parse measure type 5', () => {
    const measure = new Measure('A B C');
    expect(measure.type).to.be.equal(5);
  });

  test('Parse measure type 6', () => {
    const measure = new Measure('A B _ C');
    expect(measure.type).to.be.equal(6);
  });

  test('Parse measure type 7', () => {
    const measure = new Measure('A _ B C');
    expect(measure.type).to.be.equal(7);
  });

  test('Parse measure type 8', () => {
    const measure = new Measure('A B C D');
    expect(measure.type).to.be.equal(8);
  });

  test('Parse part', () => {
    const measure = new Measure('(a) A');
    expect(measure.raw).to.be.equal('(a) A');
    expect(measure.chords).to.deep.equal([new Chord('A', 4)]);
    expect(measure.part).to.be.equal('a');
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });

  test('Parse repeat end', () => {
    const measure = new Measure('A :');
    expect(measure.raw).to.be.equal('A :');
    expect(measure.chords).to.deep.equal([new Chord('A', 4)]);
    expect(measure.repeat_end).to.be.true;
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });

  test('Parse repeat start', () => {
    const measure = new Measure(': A');
    expect(measure.raw).to.be.equal(': A');
    expect(measure.chords).to.deep.equal([new Chord('A', 4)]);
    expect(measure.repeat_start).to.be.true;
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });
});
