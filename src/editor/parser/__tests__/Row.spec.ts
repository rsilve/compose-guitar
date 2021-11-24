import { expect } from "@open-wc/testing";
import Row from "../Row";
import Measure from "../Measure";

suite("Parse row", () => {
  test("Parse invalid", () => {
    const measure = new Row("A ||| B");
    expect(measure.raw).to.be.equal("A ||| B");
    expect(measure.valid).to.be.false;
    expect(measure.measure).to.deep.equal([]);
  });

  test("Parse invalid chord_render", () => {
    const measure = new Row("R");
    expect(measure.raw).to.be.equal("R");
    expect(measure.valid).to.be.false;
    expect(measure.measure).to.deep.equal([new Measure("R")]);
  });

  test("Parse simple", () => {
    const measure = new Row("A");
    expect(measure.raw).to.be.equal("A");
    expect(measure.valid).to.be.true;
    expect(measure.measure).to.deep.equal([new Measure("A")]);
  });

  test("Parse multiple", () => {
    const measure = new Row("A | B");
    expect(measure.raw).to.be.equal("A | B");
    expect(measure.valid).to.be.true;
    expect(measure.measure).to.deep.equal([new Measure("A |"), new Measure("B")]);
  });

  test("Parse multiple with bar", () => {
    const measure = new Row("| A | B ||");
    expect(measure.raw).to.be.equal("| A | B ||");
    expect(measure.valid).to.be.true;
    expect(measure.measure).to.deep.equal([new Measure("| A |"), new Measure("B ||")]);
  });
});
