import { expect } from "@open-wc/testing";
import localize, { getLocale, setLocale } from "../initLocale";

suite("initLocale", () => {
  test("localize", async () => {
    await localize();
    expect(getLocale()).to.be.equals("en");
  });

  test("localize and setLocale", async () => {
    await localize();
    await setLocale("fr");
    expect(getLocale()).to.be.equals("fr");
  });

  test("localize and setLocale invalid locale", async () => {
    await localize();
    try {
      await setLocale("fre");
    } catch (e) {
      expect(getLocale()).to.be.equals("en");
    }
  });
});
