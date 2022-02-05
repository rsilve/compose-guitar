import { expect } from "@open-wc/testing";
import FeatureFlag from "../../stores/FeatureFlag";
import { stateTest } from "../../__tests__/TestHelpers";

suite("FeatureFlag", () => {
  test("has getter", () => {
    const flags = FeatureFlag.get();
    expect(flags).to.be.not.null;
    expect(flags.synchro_enabled).to.be.false;
  });

  test("has init", () => {
    FeatureFlag.init({ ...stateTest, featureFlags: { synchro_enabled: true } });
    const flags = FeatureFlag.get();
    expect(flags).to.be.not.null;
    expect(flags.synchro_enabled).to.be.true;
  });
});
