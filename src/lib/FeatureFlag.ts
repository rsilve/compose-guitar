import { IState, IStateFeatureFlag } from "./state";

function getBoolean(value: string | boolean | undefined): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (value === undefined) {
    return false;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

const _featureFlag: IStateFeatureFlag = {
  synchro_enabled: getBoolean(import.meta.env?.VITE_SYNCHRO_ENABLED || false),
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
