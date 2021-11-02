import create from 'zustand';

interface ITestZustand {
  bears: number;
  wolfs: number;
  increasePopulation: () => void;
  setPopulation: (newValue: number) => void;
}

export const useTestZustand = create((set) => ({
  bears: 0,
  wolfs: 10,
  increasePopulation: () => set((state: ITestZustand) => ({ bears: state.bears + 1 })),
  setPopulation: (newValue: number) => set({ bears: newValue }),
}));

// selectors
export const selectBears = (state: ITestZustand) => state.bears;
export const selectIncreasePopulation = (state: ITestZustand) => state.increasePopulation;
export const selectSetPopulation = (state: ITestZustand) => state.setPopulation;
