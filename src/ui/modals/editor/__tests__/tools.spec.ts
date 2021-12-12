import { expect } from "@open-wc/testing";
import { auto_correct, normalize } from "../tools";

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
    expect(auto_correct(",")).to.be.equal("|");
  });

  test("replace ; by |", () => {
    expect(auto_correct(";")).to.be.equal("|");
  });

  test("replace . by _", () => {
    expect(auto_correct("A.B")).to.be.equal("| A _ B");
  });

  test("replace . by _", () => {
    expect(auto_correct("A. B")).to.be.equal("| A _ B");
  });

  test("capitalize first letter for chord", () => {
    expect(auto_correct("|a")).to.be.equal("| A");
  });

  test("capitalize first letter for chord", () => {
    expect(auto_correct("am")).to.be.equal("| Am");
  });

  test("add | at begin of input", () => {
    expect(auto_correct("Am")).to.be.equal("| Am");
  });

  test("add | at begin and end of line", () => {
    expect(auto_correct("Am\nB")).to.be.equal("| Am |\n| B");
  });

  test("add space between A and |", () => {
    expect(auto_correct("A|")).to.be.equal("| A |");
  });

  test("add space between | and A", () => {
    expect(auto_correct("|A")).to.be.equal("| A");
  });

  test("not add space between | and (", () => {
    expect(auto_correct("|(")).to.be.equal("|(");
  });

  test(" add space between |(x) and A", () => {
    expect(auto_correct("|(x)A")).to.be.equal("|(x) A");
  });

  test("do not add space between : and |", () => {
    expect(auto_correct(":|")).to.be.equal(":|");
  });

  test("do not add space between | and :", () => {
    expect(auto_correct("|:")).to.be.equal("|:");
  });
});
