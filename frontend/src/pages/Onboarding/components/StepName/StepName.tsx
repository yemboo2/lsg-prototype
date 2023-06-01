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
      <Text color="white" mb="5vh" mt="1vh" style={{ textAlign: 'justify', hyphens: 'auto' }}>
        {t('onboarding.naming.description')}
      </Text>
      <div style={{ width: '100%' }}>
        <Input
          value={name}
          onChange={handleChange}
          placeholder={t('onboarding.naming.placeholder')}
          size="md"
          color="white"
        />
      </div>
    </Container>
  );
};

export default StepName;
