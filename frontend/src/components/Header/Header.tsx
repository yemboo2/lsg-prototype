import { Box, Text } from '@chakra-ui/layout';

import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import { Container } from './styles';

const Header = () => (
  <Container>
    <div className="title">
      <Text color="white" textShadow="2px 2 px black" fontWeight="bold" fontSize="3xl">
        Leela-Sid-G!ng
      </Text>
    </div>
    <Box className="language">
      <LanguageSwitch />
    </Box>
  </Container>
);

export default Header;
