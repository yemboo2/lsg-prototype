import React from 'react';
import { Heading } from '@chakra-ui/layout';

import OnboardingButton from '../OnboardingButton/OnboardingButton';
import { IOnboardingButton } from '../OnboardingButton/types';
import { Container } from './styles';

export interface IOnboardingStepProps {
  headline: string;
  children: React.ReactElement;
  buttons: IOnboardingButton[];
}

const OnboardingStep = ({ headline, children, buttons }: IOnboardingStepProps) => (
  <Container>
    <div className="headline">
      <Heading size="lg" color="white">
        {headline}
      </Heading>
    </div>
    <div className="content">{children}</div>
    <div className="buttons">
      {buttons.map((button) => (
        <OnboardingButton
          key={`${headline}-${button.type}`}
          type={button.type}
          onClick={button.onClick}
        />
      ))}
    </div>
  </Container>
);

export default OnboardingStep;
