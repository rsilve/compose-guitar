import { IStateFeatureFlag } from "src/stores/state";

function getBoolean(value: string): boolean {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

const featureFlag: IStateFeatureFlag = {
  synchro_enabled: getBoolean("__synchro_enabled__"),
};

class FeatureFlag {
  get(): IStateFeatureFlag {
    return featureFlag;
  }
}

export default new FeatureFlag();
