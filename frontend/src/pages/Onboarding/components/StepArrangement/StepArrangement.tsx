import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Text } from '@chakra-ui/layout';
import { useTranslation } from 'react-i18next';

import { List } from './List';
import { Container } from './styles';
import { selectSetBlockOrder, useOnboarding } from '../../state';

const StepArrangment = () => {
  const { t } = useTranslation();
  const setBlockOrder = useOnboarding(selectSetBlockOrder);

  return (
    <>
      <Text color="white" w="100%" textAlign="left">
        {t('onboarding.arrangement.description')}
      </Text>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <Container>
          <List orderChanged={setBlockOrder} />
        </Container>
      </DndProvider>
    </>
  );
};

export default StepArrangment;
