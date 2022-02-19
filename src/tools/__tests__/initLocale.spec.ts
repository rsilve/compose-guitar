import { expect } from "@open-wc/testing";
import localize, { getLocale, setLocale } from "../initLocale";

describe("initLocale", () => {
  it("localize", async () => {
    await localize();
    expect(getLocale()).to.be.equals("en");
  });

  it("localize and setLocale", async () => {
    await localize();
    await setLocale("fr");
    expect(getLocale()).to.be.equals("fr");
  });

  it("localize and setLocale invalid locale", async () => {
    await localize();
    try {
      await setLocale("fre");
    } catch (e) {
      expect(getLocale()).to.be.equals("en");
    }
  });
});
