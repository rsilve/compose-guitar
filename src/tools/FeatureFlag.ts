function getBoolean(value: string): boolean {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

type FeatureFlagType = {
  synchro_enabled: boolean;
};

const featureFlag: FeatureFlagType = {
  synchro_enabled: getBoolean("__synchro_enabled__"),
};

class FeatureFlag {
  get(): FeatureFlagType {
    return featureFlag;
  }
}

export default new FeatureFlag();
