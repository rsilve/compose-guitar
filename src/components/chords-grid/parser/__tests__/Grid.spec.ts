import { expect } from "@open-wc/testing";
import Row from "../Row";
import Grid from "../Grid";

describe("Parse grid", () => {
  it("Parse undefiend", () => {
    const measure = new Grid(undefined);
    expect(measure.raw).to.be.undefined;
    expect(measure.valid).to.be.true;
    expect(measure.rows).to.deep.equal([]);
  });

  it("Parse simple", () => {
    const measure = new Grid("A");
    expect(measure.raw).to.be.equal("A");
    expect(measure.valid).to.be.true;
    expect(measure.rows).to.deep.equal([new Row("A")]);
  });

  it("Parse multiple line", () => {
    const measure = new Grid("A\nB");
    expect(measure.raw).to.be.equal("A\nB");
    expect(measure.valid).to.be.true;
    expect(measure.rows).to.deep.equal([new Row("A"), new Row("B")]);
  });

  it("Parse invalid", () => {
    const measure = new Grid("N");
    expect(measure.raw).to.be.equal("N");
    expect(measure.valid).to.be.false;
    expect(measure.reason).to.be.equal("N");
    expect(measure.rows).to.deep.equal([new Row("N")]);
  });
});
