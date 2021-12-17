import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import Header from '../components/Header/Header';
import RouterOutlet from '../routes/RouterOutlet';
import { Container } from './styles';
import { selectSetSequences, selectSetUserId, useUser } from '../state/user';
import { getUserId, getUserSequences } from '../helpers/cookie-helper';

const App = () => {
  const setUserId = useUser(selectSetUserId);
  const setUserSequences = useUser(selectSetSequences);

  /**
   * Check if user cookie exists and set user-id state
   */
  useEffect(() => {
    const userId = getUserId();
    const userSequences = getUserSequences();

    if (userId) setUserId(userId);
    if (userSequences) setUserSequences(userSequences);
  });

  return (
    <ChakraProvider>
      <Container>
        <Header />
        <RouterOutlet />
      </Container>
    </ChakraProvider>
  );
};

export default App;
