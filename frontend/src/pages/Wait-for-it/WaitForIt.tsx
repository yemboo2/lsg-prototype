import { Checkbox, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header/Header';
import { waitForItList } from './constants';
import { Container, ItemContainer } from './styles';
import { IWaitForItList } from './types';

const WaitForIt = () => {
  const { t } = useTranslation();

  const renderList = ({ heading, items, done }: IWaitForItList) => (
    <>
      <Heading key={`wfil-${heading}`} color="white" mt="4vh" mb="1vh">
        {t(`waitForItList.${heading}.heading`)}
      </Heading>
      <ItemContainer>
        {items.map((item) => (
          <Checkbox
            key={`wfil-${heading}-${item}`}
            isReadOnly
            color="white"
            isChecked={done}
            textDecoration={done ? 'line-through' : ''}
            style={{ cursor: 'auto' }}
          >
            {t(`waitForItList.${heading}.${item}`)}
          </Checkbox>
        ))}
      </ItemContainer>
    </>
  );

  return (
    <>
      <Header />
      <Container>
        <div className="content-container">
          <Heading color="white" mt="4vh" mb="3vh">
            {t('waitForItList.heading')}
          </Heading>
          <Text
            color="white"
            margin="auto"
            width="80%"
            style={{ textAlign: 'justify', hyphens: 'auto' }}
          >
            {t('waitForItList.description')}
          </Text>
          {waitForItList.map((list) => renderList(list))}
        </div>
      </Container>
    </>
  );
};

export default WaitForIt;
