import { expect } from "@open-wc/testing";
import { AutoCorrect, normalize } from "../tools";

describe("tools normalize", () => {
  it("return text", () => {
    expect(normalize("A")).to.be.equal("A");
  });

  it("remove trailing orphan |", () => {
    expect(normalize("A\n|")).to.be.equal("A");
  });

  it("trim text", () => {
    expect(normalize(" A ")).to.be.equal("A");
  });

  it("trim text", () => {
    expect(normalize(" A ")).to.be.equal("A");
  });
});

describe("tools auto_correct", () => {
  it("replace , by |", () => {
    const correct = new AutoCorrect(",", -1);
    expect(correct.value).to.be.equal("|");
  });

  it("replace ; by |", () => {
    const correct = new AutoCorrect(";", -1);
    expect(correct.value).to.be.equal("|");
  });

  it("replace . by _", () => {
    const correct = new AutoCorrect("A.B", -1);
    expect(correct.value).to.be.equal("| A _ B |");
  });

  it("replace . by _", () => {
    const correct = new AutoCorrect("A. B", -1);
    expect(correct.value).to.be.equal("| A _ B |");
  });

  it("capitalize first letter for chord", () => {
    const correct = new AutoCorrect("|a", -1);
    expect(correct.value).to.be.equal("| A |");
  });

  it("capitalize first letter for chord", () => {
    const correct = new AutoCorrect("am", -1);
    expect(correct.value).to.be.equal("| Am |");
  });

  it("add | at begin of input", () => {
    const correct = new AutoCorrect("Am", -1);
    expect(correct.value).to.be.equal("| Am |");
  });

  it("add | at begin and end of line", () => {
    const correct = new AutoCorrect("Am\nB", -1);
    expect(correct.value).to.be.equal("| Am |\n| B |");
  });

  it("add space between A and |", () => {
    const correct = new AutoCorrect("A|", -1);
    expect(correct.value).to.be.equal("| A |");
  });

  it("add space between | and A", () => {
    const correct = new AutoCorrect("|A", -1);
    expect(correct.value).to.be.equal("| A |");
  });

  it("not add space between | and (", () => {
    const correct = new AutoCorrect("|(", -1);
    expect(correct.value).to.be.equal("|( |");
  });

  it(" add space between |(x) and A", () => {
    const correct = new AutoCorrect("|(x)A", -1);
    expect(correct.value).to.be.equal("|(x) A |");
  });

  it("do not add space between : and |", () => {
    const correct = new AutoCorrect(":|", -1);
    expect(correct.value).to.be.equal(":|");
  });

  it("do not add space between | and :", () => {
    const correct = new AutoCorrect("|:", -1);
    expect(correct.value).to.be.equal("|: |");
  });

  it("use position", () => {
    const correct = new AutoCorrect("A . B", 3);
    expect(correct.value).to.be.equal("| A _ B |");
  });
});
