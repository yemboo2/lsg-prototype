import { ChakraProvider } from '@chakra-ui/react';

import RouterOutlet from '../routes/RouterOutlet';

import './App.css';

const App = () => (
  // Optionally add a theme here
  <ChakraProvider>
    <RouterOutlet />
  </ChakraProvider>
);

export default App;
