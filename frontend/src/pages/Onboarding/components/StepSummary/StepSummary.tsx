import { Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { selectRecap, selectToggleRecap, useOnboarding } from '../../state';

const StepSummary = () => {
  const { t } = useTranslation();

  // zustand
  const toggleRecap = useOnboarding(selectToggleRecap);
  const recap = useOnboarding(selectRecap);

  return (
    <>
      <Text color="white" mb="2vh">
        Summary text & figures
      </Text>
      <Checkbox onChange={toggleRecap} isChecked={recap} color="white" mb="2vh">
        {t('onboarding.review.recap')}
      </Checkbox>
    </>
  );
};

export default StepSummary;
