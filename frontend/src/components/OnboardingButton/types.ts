export enum EOnboardingButtonType {
  BACK = 'back',
  NEXT = 'next',
  SUBMIT = 'submit',
  NONE = 'nune',
}

export interface IOnboardingButton {
  type: EOnboardingButtonType;
  onClick: () => void;
}
