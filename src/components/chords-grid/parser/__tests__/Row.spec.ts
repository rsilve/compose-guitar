import { expect } from "@open-wc/testing";
import Row from "../Row";
import Measure from "../Measure";

describe("Parse row", () => {
  it("Parse invalid", () => {
    const measure = new Row("A ||| B");
    expect(measure.raw).to.be.equal("A ||| B");
    expect(measure.valid).to.be.false;
    expect(measure.measure).to.deep.equal([]);
  });

  it("Parse invalid chord_render", () => {
    const measure = new Row("R");
    expect(measure.raw).to.be.equal("R");
    expect(measure.valid).to.be.false;
    expect(measure.measure).to.deep.equal([new Measure("R")]);
  });

  it("Parse simple", () => {
    const measure = new Row("A");
    expect(measure.raw).to.be.equal("A");
    expect(measure.valid).to.be.true;
    expect(measure.measure).to.deep.equal([new Measure("A")]);
  });

  it("Parse multiple", () => {
    const measure = new Row("A | B");
    expect(measure.raw).to.be.equal("A | B");
    expect(measure.valid).to.be.true;
    expect(measure.measure).to.deep.equal([new Measure("A |"), new Measure("B")]);
  });

  it("Parse multiple with bar", () => {
    const measure = new Row("| A | B ||");
    expect(measure.raw).to.be.equal("| A | B ||");
    expect(measure.valid).to.be.true;
    expect(measure.measure).to.deep.equal([new Measure("| A |"), new Measure("B ||")]);
  });
});
