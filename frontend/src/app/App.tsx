import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import RouterOutlet from '../routes/RouterOutlet';
import { Container } from './styles';
import { selectSetSequences, selectSetUserId, useUser } from '../state/user';
import { getInfoPopup, getUserId, getUserSequences } from '../helpers/cookie-helper';
import InfoPopup from '../components/InfoPopup/InfoPopup';
import { selectInfoPopupShown, selectSetInfoPopupShown, useCommon } from '../state/common';

const App = () => {
  const setUserId = useUser(selectSetUserId);
  const setUserSequences = useUser(selectSetSequences);
  const infoPopupShown = useCommon(selectInfoPopupShown);
  const setInfoPopupShown = useCommon(selectSetInfoPopupShown);

  /**
   * Check if user cookie exists and set user-id state
   */
  useEffect(() => {
    const userId = getUserId();
    const userSequences = getUserSequences();
    const infoPopup = getInfoPopup();

    if (userId) setUserId(userId);
    if (userSequences) setUserSequences(userSequences);
    if (!infoPopup) setInfoPopupShown(false);
  }, []);

  return (
    <ChakraProvider>
      <Container>
        {!infoPopupShown && <InfoPopup />}
        <RouterOutlet />
      </Container>
    </ChakraProvider>
  );
};

export default App;
