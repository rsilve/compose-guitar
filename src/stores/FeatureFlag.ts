import { IState, IStateFeatureFlag } from "src/stores/state";

function getBoolean(value: string): boolean {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

const _featureFlag: IStateFeatureFlag = {
  synchro_enabled: getBoolean("__synchro_enabled__"),
};

let aggregatedFeatureFlag = { ..._featureFlag };

class FeatureFlag {
  get(): IStateFeatureFlag {
    return aggregatedFeatureFlag;
  }

  init(state: IState): void {
    aggregatedFeatureFlag = { ...aggregatedFeatureFlag, ...state.featureFlags };
  }
}

export default new FeatureFlag();
