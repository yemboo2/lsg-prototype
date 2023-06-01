import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Text } from '@chakra-ui/layout';
import { useTranslation } from 'react-i18next';

import { List } from './List';
import { Container } from './styles';
import { selectSetBlockOrder, useOnboarding } from '../../state';
import { ECategory } from '../../../../enums/category';

const StepArrangment = () => {
  const { t } = useTranslation();
  const setBlockOrder = useOnboarding(selectSetBlockOrder);

  return (
    <Container>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        {t('onboarding.arrangement.description')}
      </Text>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <div className="block-container">
          <List orderChanged={setBlockOrder} />
        </div>
      </DndProvider>

      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt="5vh"
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        <p style={{ fontWeight: 'bold', display: 'inline' }}>
          {`${t(`category.${ECategory.ACTIVITY}`)}: `}
        </p>
        <p style={{ display: 'inline' }}>{t('onboarding.arrangement.activity')}</p>
      </Text>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt="2vh"
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        <p style={{ fontWeight: 'bold', display: 'inline' }}>
          {`${t(`category.${ECategory.MENTAL}`)}: `}
        </p>
        <p style={{ display: 'inline' }}>{t('onboarding.arrangement.mental')}</p>
      </Text>
      <Text
        color="white"
        w="100%"
        textAlign="left"
        mt="2vh"
        style={{ textAlign: 'justify', hyphens: 'auto' }}
      >
        <p style={{ fontWeight: 'bold', display: 'inline' }}>
          {`${t(`category.${ECategory.WORK}`)}: `}
        </p>
        <p style={{ display: 'inline' }}>{t('onboarding.arrangement.deepwork')}</p>
      </Text>
    </Container>
  );
};

export default StepArrangment;
