import { expect } from "@open-wc/testing";
import { AutoCorrect, normalize } from "../tools";

suite("tools normalize", () => {
  test("return text", () => {
    expect(normalize("A")).to.be.equal("A");
  });

  test("remove trailing orphan |", () => {
    expect(normalize("A\n|")).to.be.equal("A");
  });

  test("trim text", () => {
    expect(normalize(" A ")).to.be.equal("A");
  });

  test("trim text", () => {
    expect(normalize(" A ")).to.be.equal("A");
  });
});

suite("tools auto_correct", () => {
  test("replace , by |", () => {
    const correct = new AutoCorrect(",", -1);
    expect(correct.value).to.be.equal("|");
  });

  test("replace ; by |", () => {
    const correct = new AutoCorrect(";", -1);
    expect(correct.value).to.be.equal("|");
  });

  test("replace . by _", () => {
    const correct = new AutoCorrect("A.B", -1);
    expect(correct.value).to.be.equal("| A _ B |");
  });

  test("replace . by _", () => {
    const correct = new AutoCorrect("A. B", -1);
    expect(correct.value).to.be.equal("| A _ B |");
  });

  test("capitalize first letter for chord", () => {
    const correct = new AutoCorrect("|a", -1);
    expect(correct.value).to.be.equal("| A |");
  });

  test("capitalize first letter for chord", () => {
    const correct = new AutoCorrect("am", -1);
    expect(correct.value).to.be.equal("| Am |");
  });

  test("add | at begin of input", () => {
    const correct = new AutoCorrect("Am", -1);
    expect(correct.value).to.be.equal("| Am |");
  });

  test("add | at begin and end of line", () => {
    const correct = new AutoCorrect("Am\nB", -1);
    expect(correct.value).to.be.equal("| Am |\n| B |");
  });

  test("add space between A and |", () => {
    const correct = new AutoCorrect("A|", -1);
    expect(correct.value).to.be.equal("| A |");
  });

  test("add space between | and A", () => {
    const correct = new AutoCorrect("|A", -1);
    expect(correct.value).to.be.equal("| A |");
  });

  test("not add space between | and (", () => {
    const correct = new AutoCorrect("|(", -1);
    expect(correct.value).to.be.equal("|( |");
  });

  test(" add space between |(x) and A", () => {
    const correct = new AutoCorrect("|(x)A", -1);
    expect(correct.value).to.be.equal("|(x) A |");
  });

  test("do not add space between : and |", () => {
    const correct = new AutoCorrect(":|", -1);
    expect(correct.value).to.be.equal(":|");
  });

  test("do not add space between | and :", () => {
    const correct = new AutoCorrect("|:", -1);
    expect(correct.value).to.be.equal("|: |");
  });

  test("use position", () => {
    const correct = new AutoCorrect("A . B", 3);
    expect(correct.value).to.be.equal("| A _ B |");
  });
});
