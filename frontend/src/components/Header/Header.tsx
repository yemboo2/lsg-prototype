import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import { Container } from './styles';
import { ERoutes } from '../../routes/types';

const LSG_WEBSITE_URL = 'https://lsg-meta.app/';

const Header = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const goBack = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <Container>
      {history.location.pathname !== ERoutes.DEFAULT && (
        <div className="back-button-container">
          <Icon className="back-button" onClick={goBack} as={MdArrowBack} color="white" />
        </div>
      )}

      <div className="header-element">
        <Text
          className={classNames('header-element-text', {
            selected: history.location.pathname === ERoutes.DASHBOARD,
          })}
          onClick={() => history.push(ERoutes.DASHBOARD)}
        >
          {t('header.dashboard')}
        </Text>
      </div>
      <div className="header-element">
        <Text
          className={classNames('header-element-text', {
            selected: history.location.pathname === ERoutes.CREATE,
          })}
          onClick={() => history.push(ERoutes.CREATE)}
        >
          {t('header.createSequence')}
        </Text>
      </div>
      <div className="header-element">
        <div className="logo-container" onClick={() => history.push(ERoutes.DEFAULT)}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="logo"
            width={52}
            height={52}
          />
        </div>
      </div>
      <div className="header-element">
        <Text
          className={classNames('header-element-text', {
            selected: history.location.pathname === ERoutes.WAIT_FOR_IT,
          })}
          onClick={() => history.push(ERoutes.WAIT_FOR_IT)}
        >
          {t('header.waitForIt')}
        </Text>
      </div>
      <div className="header-element">
        <a href={LSG_WEBSITE_URL} target="_blank" rel="noreferrer" style={{ margin: 'auto' }}>
          <Text className="header-element-text"> {t('header.website')}</Text>
        </a>
      </div>
      <Box className="language-container">
        <LanguageSwitch />
      </Box>
    </Container>
  );
};

export default Header;
