import { EPresetType, IDurations } from './types';

export const PRESETS: Record<Exclude<EPresetType, EPresetType.INDIVIDUAL>, IDurations> = {
  [EPresetType.VAR1]: {
    work: 26,
    activity: 2,
    mental: 1,
    break: 15,
    recap: 1,
  },
  [EPresetType.VAR2]: {
    work: 35,
    activity: 5,
    mental: 2,
    break: 15,
    recap: 1,
  },
  [EPresetType.VAR3]: {
    work: 50,
    activity: 6,
    mental: 2,
    break: 25,
    recap: 1,
  },
};
