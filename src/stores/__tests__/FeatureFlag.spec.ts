import { expect } from "@open-wc/testing";
import FeatureFlag from "../../stores/FeatureFlag";

suite("FeatureFlag", () => {
  test("has getter", () => {
    const flags = FeatureFlag.get();
    expect(flags).to.be.not.null;
    expect(flags.synchro_enabled).to.be.false;
  });
});
