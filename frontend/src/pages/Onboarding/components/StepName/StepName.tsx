import React from 'react';
import { Input, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { selectName, selectSetName, useOnboarding } from '../../state';

import { Container } from './styles';

const StepName = () => {
  const { t } = useTranslation();

  // zustand
  const name = useOnboarding(selectName);
  const setName = useOnboarding(selectSetName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Container>
      <Text color="white" mb="2vh" mt="1vh">
        {t('onboarding.naming.description')}
      </Text>
      <Input
        value={name}
        onChange={handleChange}
        placeholder={t('onboarding.naming.placeholder')}
        size="md"
        color="white"
      />
    </Container>
  );
};

export default StepName;
