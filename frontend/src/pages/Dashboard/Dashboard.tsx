import { Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';
import { Container } from './styles';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Container>
        <div className="content-container">
          <Heading color="white" mt="4vh" mb="3vh">
            {t('dashboard.heading')}
          </Heading>
          <Text
            color="white"
            margin="auto"
            width="80%"
            mb="4vh"
            style={{ textAlign: 'justify', hyphens: 'auto' }}
          >
            {t('dashboard.comingSoonText')}
          </Text>
          <img
            src="/assets/images/next-big-thing.jpeg"
            alt="wait-for-it"
            height="50%"
            width="50%"
          />
          <Text
            color="white"
            margin="auto"
            width="80%"
            fontStyle="italic"
            textAlign="center"
            fontSize="4xl"
            mt="1vh"
          >
            {t('waitForIt')}
          </Text>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
