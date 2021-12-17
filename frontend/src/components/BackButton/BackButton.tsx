import { Icon } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';

import { Container } from './styles';

interface IBackButtonProps {
  className?: string;
  onGoBack: () => void;
}

const BackButton = ({ className, onGoBack }: IBackButtonProps) => (
  <Container>
    <Icon className={className || ''} onClick={onGoBack} as={MdArrowBack} color="white" />
  </Container>
);

export default BackButton;
