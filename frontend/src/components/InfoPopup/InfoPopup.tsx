import { Button, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { setInfoPopup } from '../../helpers/cookie-helper';
import { selectSetInfoPopupShown, useCommon } from '../../state/common';
import { Container } from './styles';

const InfoPopup = () => {
  const setInfoPopupShown = useCommon(selectSetInfoPopupShown);
  const { t } = useTranslation();

  return (
    <Container>
      <div className="popup">
        <Heading color="white" textAlign="center" mb="2vh">
          Information
        </Heading>
        <Text color="white" mb="1vh">
          {t('infoPopup.descriptionPart1')}
        </Text>
        <Text color="white" mb="2vh" fontWeight="bold">
          {t('infoPopup.descriptionPart2')}
        </Text>
        <div className="info-button-container">
          <Button
            variant="outline"
            border="2px"
            color="white"
            _hover={{ color: 'black', bg: 'white' }}
            onClick={() => {
              setInfoPopupShown(true);
              setInfoPopup();
            }}
          >
            {t('infoPopup.buttonText')}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default InfoPopup;
