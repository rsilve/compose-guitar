import { expect } from "@open-wc/testing";
import Chord from "../Chord";
import Measure from "../Measure";

describe("Parse measure", () => {
  it("Parse invalid", () => {
    const measure = new Measure("A B C D E");
    expect(measure.raw).to.be.equal("A B C D E");
    expect(measure.chords).to.deep.equal([]);
    expect(measure.valid).to.be.false;
  });

  it("Parse invalid chord_render", () => {
    const measure = new Measure("R");
    expect(measure.raw).to.be.equal("R");
    expect(measure.chords).to.deep.equal([new Chord("R", 4)]);
    expect(measure.valid).to.be.false;
  });

  it("Parse simple", () => {
    const measure = new Measure("A");
    expect(measure.raw).to.be.equal("A");
    expect(measure.chords).to.deep.equal([new Chord("A", 4)]);
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });

  it("Parse multiple", () => {
    const measure = new Measure(" A B C D");
    expect(measure.raw).to.be.equal("A B C D");
    expect(measure.chords).to.deep.equal([new Chord("A"), new Chord("B"), new Chord("C"), new Chord("D")]);
    expect(measure.valid).to.be.true;
  });

  it("Parse measure type 1", () => {
    const measure = new Measure("A");
    expect(measure.type).to.be.equal(1);
  });

  it("Parse measure type 2", () => {
    const measure = new Measure("A B _ _");
    expect(measure.type).to.be.equal(2);
  });

  it("Parse measure type 3", () => {
    const measure = new Measure("A B");
    expect(measure.type).to.be.equal(3);
  });

  it("Parse measure type 3 bis", () => {
    const measure = new Measure("A _ B");
    expect(measure.type).to.be.equal(3);
  });

  it("Parse measure type 4", () => {
    const measure = new Measure("A _ _ B");
    expect(measure.type).to.be.equal(4);
  });

  it("Parse measure type 5", () => {
    const measure = new Measure("A B C");
    expect(measure.type).to.be.equal(5);
  });

  it("Parse measure type 6", () => {
    const measure = new Measure("A B _ C");
    expect(measure.type).to.be.equal(6);
  });

  it("Parse measure type 7", () => {
    const measure = new Measure("A _ B C");
    expect(measure.type).to.be.equal(7);
  });

  it("Parse measure type 8", () => {
    const measure = new Measure("A B C D");
    expect(measure.type).to.be.equal(8);
  });

  it("Parse part", () => {
    const measure = new Measure("(a) A");
    expect(measure.raw).to.be.equal("(a) A");
    expect(measure.chords).to.deep.equal([new Chord("A", 4)]);
    expect(measure.part).to.be.equal("a");
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });

  it("Parse repeat end", () => {
    const measure = new Measure("A :");
    expect(measure.raw).to.be.equal("A :");
    expect(measure.chords).to.deep.equal([new Chord("A", 4)]);
    expect(measure.repeatEnd).to.be.true;
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });

  it("Parse repeat start", () => {
    const measure = new Measure(": A");
    expect(measure.raw).to.be.equal(": A");
    expect(measure.chords).to.deep.equal([new Chord("A", 4)]);
    expect(measure.repeatStart).to.be.true;
    expect(measure.valid).to.be.true;
    expect(measure.type).to.be.equal(1);
  });
});
