import { Button } from '@chakra-ui/button';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

import { EOnboardingButtonType, IOnboardingButton } from './types';

const getLeftIcon = (type: EOnboardingButtonType) => {
  if (type === EOnboardingButtonType.BACK) return <ArrowBackIcon />;
  return undefined;
};

const getRightIcon = (type: EOnboardingButtonType) => {
  if (type === EOnboardingButtonType.NEXT) return <ArrowForwardIcon />;
  return undefined;
};

interface IOnboardingButtonProps extends IOnboardingButton {}

const OnboardingButton = ({ type, onClick }: IOnboardingButtonProps) => {
  const { t } = useTranslation();

  // Hack to have correct button positioning if only 1
  // button on OnboardingStep (flex:space-around)
  if (type === EOnboardingButtonType.NONE) return <div />;

  return (
    <Button
      variant="outline"
      leftIcon={getLeftIcon(type)}
      rightIcon={getRightIcon(type)}
      onClick={onClick}
      border="2px"
      color="white"
      _hover={{ color: 'black', bg: 'white' }}
    >
      {t(`onboarding.button.${type}`)}
    </Button>
  );
};

export default OnboardingButton;
