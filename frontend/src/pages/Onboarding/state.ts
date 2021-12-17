import create, { SetState } from 'zustand';

import { ECategory } from '../../enums/category';
import { PRESETS } from './components/StepDuration/constants';
import { EPresetType } from './components/StepDuration/types';
import { IBlockOrder, IDurations } from './types';

interface IOnboardingZustand {
  name: string;
  blockOrder: IBlockOrder;
  durations: IDurations;
  setName: (name: string) => void;
  setBlockOrder: (blockOrder: IBlockOrder) => void;
  setDuration: (category: ECategory, duration: number) => void;
}

const setDuration = (set: SetState<object>) => (category: ECategory, duration: number) =>
  set((state: IOnboardingZustand) => {
    const newDurations = { ...state.durations };
    newDurations[category] = duration;
    return { durations: newDurations };
  });

// Create zustand & set initial state
export const useOnboarding = create(
  (set) =>
    ({
      blockOrder: {
        first: ECategory.ACTIVITY,
        second: ECategory.MENTAL,
        third: ECategory.WORK,
      } as IBlockOrder,
      durations: PRESETS[EPresetType.VAR1],
      name: '',
      setName: (name: string) => set({ name }),
      setBlockOrder: (blockOrder: IBlockOrder) => set({ blockOrder }),
      setDuration: setDuration(set),
    } as IOnboardingZustand)
);

export const selectName = (state: IOnboardingZustand) => state.name;
export const selectBlockOrder = (state: IOnboardingZustand) => state.blockOrder;
export const selectDurations = (state: IOnboardingZustand) => state.durations;

export const selectSetName = (state: IOnboardingZustand) => state.setName;
export const selectSetBlockOrder = (state: IOnboardingZustand) => state.setBlockOrder;
export const selectSetDuration = (state: IOnboardingZustand) => state.setDuration;
