import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Text } from '@chakra-ui/layout';

import { List } from './List';
import { Container } from './styles';
import { selectSetBlockOrder, useOnboarding } from '../../state';

const StepArrangment = () => {
  const setBlockOrder = useOnboarding(selectSetBlockOrder);

  return (
    <>
      <Text color="white" w="100%" textAlign="left">
        Lets first define how you want to have your categories arrangent - or in other words - what
        should follow what. The below is the order we recommend. Although, feel free to change it.
      </Text>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <List orderChanged={setBlockOrder} />
        </Container>
      </DndProvider>
    </>
  );
};

export default StepArrangment;
