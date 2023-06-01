import create from 'zustand';

interface ICommonZustand {
  infoPopupShown: boolean;
  setInfoPopupShown: (value: boolean) => void;
}

// Create zustand & set initial state
export const useCommon = create((set) => ({
  infoPopupShown: true,
  setInfoPopupShown: (infoPopupShown: boolean) => set({ infoPopupShown }),
}));

export const selectInfoPopupShown = (state: ICommonZustand) => state.infoPopupShown;
export const selectSetInfoPopupShown = (state: ICommonZustand) => state.setInfoPopupShown;
