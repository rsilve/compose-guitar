function getBoolean(value: string): boolean {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

export const FeatureFlag = {
  synchro_enabled: getBoolean("__synchro_enabled__"),
};
