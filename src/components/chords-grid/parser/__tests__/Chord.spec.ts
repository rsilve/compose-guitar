import { expect } from "@open-wc/testing";
import Chord from "../Chord";

describe("Parse chords", () => {
  it("Parse invalid", () => {
    const chord = new Chord("R");
    expect(chord.name).to.be.equal("R");
    expect(chord.base).to.be.null;
    expect(chord.baseModifier).to.be.null;
    expect(chord.color).to.be.null;
    expect(chord.extension).to.be.null;
    expect(chord.externalBase).to.be.null;
    expect(chord.valid).to.be.false;
    expect(chord.empty).to.be.false;
  });

  it("Parse simple", () => {
    const chord = new Chord("A");
    expect(chord.name).to.be.equal("A");
    expect(chord.valid).to.be.true;
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.null;
    expect(chord.color).to.be.null;
    expect(chord.extension).to.be.null;
    expect(chord.externalBase).to.be.null;
    expect(chord.empty).to.be.false;
    expect(chord.same).to.be.false;
  });

  it("Parse simple + modifier", () => {
    const chord = new Chord("Ab");
    expect(chord.name).to.be.equal("Ab");
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.equal("b");
    expect(chord.color).to.be.null;
    expect(chord.extension).to.be.null;
    expect(chord.externalBase).to.be.null;
    expect(chord.valid).to.be.true;
  });

  it("Parse simple + modifier + color", () => {
    const chord = new Chord("Abm");
    expect(chord.name).to.be.equal("Abm");
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.equal("b");
    expect(chord.color).to.be.equal("m");
    expect(chord.extension).to.be.null;
    expect(chord.externalBase).to.be.null;
    expect(chord.valid).to.be.true;
  });

  it("Parse simple + modifier + color + extension", () => {
    const chord = new Chord("Abm7");
    expect(chord.name).to.be.equal("Abm7");
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.equal("b");
    expect(chord.color).to.be.equal("m");
    expect(chord.extension).to.be.equal("7");
    expect(chord.externalBase).to.be.null;
    expect(chord.valid).to.be.true;
  });

  it("Parse simple + modifier + color + extension + external base", () => {
    const chord = new Chord("Abm7/G");
    expect(chord.name).to.be.equal("Abm7/G");
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.equal("b");
    expect(chord.color).to.be.equal("m");
    expect(chord.extension).to.be.equal("7");
    expect(chord.externalBase).to.be.equal("G");
    expect(chord.externalBaseModifier).to.be.null;
    expect(chord.valid).to.be.true;
  });

  it("Parse simple + modifier + color + extension + external base + modifier", () => {
    const chord = new Chord("Abm7/Gb");
    expect(chord.name).to.be.equal("Abm7/Gb");
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.equal("b");
    expect(chord.color).to.be.equal("m");
    expect(chord.extension).to.be.equal("7");
    expect(chord.externalBase).to.be.equal("G");
    expect(chord.externalBaseModifier).to.be.equal("b");
    expect(chord.valid).to.be.true;
  });

  it("Parse simple + modifier", () => {
    const chord = new Chord("A+5");
    expect(chord.name).to.be.equal("A+5");
    expect(chord.base).to.be.equal("A");
    expect(chord.baseModifier).to.be.null;
    expect(chord.color).to.be.null;
    expect(chord.extension).to.be.equal("+5");
    expect(chord.externalBase).to.be.null;
    expect(chord.valid).to.be.true;
  });

  it("Parse base", () => {
    const base = ["A", "B", "C", "D", "E", "F", "G"];
    for (const b of base) {
      const chord = new Chord(b);
      expect(chord.name).to.be.equal(b);
      expect(chord.base).to.be.equal(b);
    }
  });

  it("Parse base modifier", () => {
    const modifier = ["b", "#"];
    for (const b of modifier) {
      const chord = new Chord(`A${b}`);
      expect(chord.name).to.be.equal(`A${b}`);
      expect(chord.base).to.be.equal("A");
      expect(chord.baseModifier).to.be.equal(b);
    }
  });

  it("Parse extension", () => {
    const modifier = ["-", "+", "ø", "°", "5b", "6", "7", "9", "add", "sus2", "sus4", "Maj7"];
    for (const b of modifier) {
      const chord = new Chord(`A${b}`);
      expect(chord.name).to.be.equal(`A${b}`);
      expect(chord.base).to.be.equal("A");
      expect(chord.extension).to.be.equal(b);
    }
  });

  it("tone", () => {
    const base: Record<string, number> = {
      A: 0,
      "A#": 1,
      Ab: 11,
      B: 2,
      C: 3,
      D: 5,
      E: 7,
      F: 8,
      G: 10,
      "G#": 11,
      Gb: 9,
    };
    for (const b of Object.keys(base)) {
      const chord = new Chord(b);
      expect(chord.tone()).to.be.equal(base[b]);
    }
  });

  it("transpose", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(0);
    expect(transposed.name).to.be.equal("A");
  });

  it("transpose 001", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(1);
    expect(transposed.name).to.be.equal("A#");
  });
  it("transpose 002", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(2);
    expect(transposed.name).to.be.equal("B");
  });
  it("transpose 003", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(3);
    expect(transposed.name).to.be.equal("C");
  });
  it("transpose 004", () => {
    const orig = new Chord("D7sus4");
    const transposed = orig.transpose(3);
    expect(transposed.name).to.be.equal("F7sus4");
  });

  it("transpose 005", () => {
    const orig = new Chord("G");
    const transposed = orig.transpose(4);
    expect(transposed.name).to.be.equal("B");
  });

  it("transpose 006", () => {
    const orig = new Chord("Gdim");
    const transposed = orig.transpose(12);
    expect(transposed.name).to.be.equal("Gdim");
  });

  it("transpose 007", () => {
    const orig = new Chord("B");
    const transposed = orig.transpose(2);
    expect(transposed.name).to.be.equal("C#");
  });

  it("transpose 008", () => {
    const orig = new Chord("C");
    const transposed = orig.transpose(2);
    expect(transposed.name).to.be.equal("D");
  });

  it("transpose 009", () => {
    const orig = new Chord("D");
    const transposed = orig.transpose(2);
    expect(transposed.name).to.be.equal("E");
  });

  it("transpose 010", () => {
    const orig = new Chord("A/G");
    const transposed = orig.transpose(4);
    expect(transposed.name).to.be.equal("C#/B");
  });

  it("transpose 011", () => {
    const orig = new Chord("%");
    const transposed = orig.transpose(4);
    expect(transposed.name).to.be.equal("%");
  });

  it("transpose negative 001", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(-1);
    expect(transposed.name).to.be.equal("Ab");
  });

  it("transpose negative 002", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(-2);
    expect(transposed.name).to.be.equal("G");
  });

  it("transpose negative 003", () => {
    const orig = new Chord("A");
    const transposed = orig.transpose(-12);
    expect(transposed.name).to.be.equal("A");
  });

  it("Parse empty", () => {
    const chord = new Chord("X");
    expect(chord.name).to.be.equal("X");
    expect(chord.valid).to.be.true;
    expect(chord.base).to.be.null;
    expect(chord.baseModifier).to.be.null;
    expect(chord.color).to.be.null;
    expect(chord.extension).to.be.null;
    expect(chord.externalBase).to.be.null;
    expect(chord.empty).to.be.true;
  });

  it("Parse same", () => {
    const chord = new Chord("%");
    expect(chord.name).to.be.equal("%");
    expect(chord.valid).to.be.true;
    expect(chord.base).to.be.equal("%");
    expect(chord.baseModifier).to.be.null;
    expect(chord.color).to.be.null;
    expect(chord.extension).to.be.null;
    expect(chord.externalBase).to.be.null;
    expect(chord.empty).to.be.false;
    expect(chord.same).to.be.true;
  });
});
