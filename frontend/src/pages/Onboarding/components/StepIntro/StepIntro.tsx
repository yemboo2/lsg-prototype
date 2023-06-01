import { Text } from '@chakra-ui/layout';
import { useTranslation } from 'react-i18next';

const StepIntro = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        {t('onboarding.intro.descriptionPart1')}
      </Text>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt={3}
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        {t('onboarding.intro.descriptionPart2')}
      </Text>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt={3}
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        {t('onboarding.intro.descriptionPart3')}
      </Text>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt={3}
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        {t('onboarding.intro.descriptionPart4')}
      </Text>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt={3}
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        {t('onboarding.intro.descriptionPart5')}
      </Text>
    </>
  );
};

export default StepIntro;
