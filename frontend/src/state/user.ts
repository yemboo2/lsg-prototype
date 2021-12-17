import create, { SetState } from 'zustand';

import { IUserActivities } from '../interfaces/activities-interface';
import { ISequence } from '../interfaces/sequence-interface';

interface IUserZustand {
  id?: string;
  sequences: ISequence[];
  activites?: IUserActivities;
  setId: (id: string) => void;
  addSequence: (sequence: ISequence) => void;
  setSequences: (sequences: ISequence[]) => void;
  setActivites: (activites: IUserActivities) => void;
}

const addSequence = (set: SetState<object>) => (sequence: ISequence) =>
  set((state: IUserZustand) => ({ sequences: [...state.sequences, sequence] }));

// Create zustand & set initial state
export const useUser = create((set) => ({
  id: undefined,
  sequences: [],
  setId: (id: string) => set({ id }),
  addSequence: addSequence(set),
  setSequences: (sequences: ISequence[]) => set({ sequences }),
  setActivites: (activites: IUserActivities) => set({ activites }),
}));

export const selectUserId = (state: IUserZustand) => state.id;
export const selectSequences = (state: IUserZustand) => state.sequences;
export const selectActivites = (state: IUserZustand) => state.activites;

export const selectSetUserId = (state: IUserZustand) => state.setId;
export const selectAddSequence = (state: IUserZustand) => state.addSequence;
export const selectSetSequences = (state: IUserZustand) => state.setSequences;
export const selectSetActivites = (state: IUserZustand) => state.setActivites;
