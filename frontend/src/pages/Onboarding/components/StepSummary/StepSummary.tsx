import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const StepSummary = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text color="white" mb="2vh">
        Summary text & figures
      </Text>
    </>
  );
};

export default StepSummary;
