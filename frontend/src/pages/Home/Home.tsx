import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ERoutes } from '../../routes/types';
import i18n from '../../services/i18n';

// interface IHomeProps extends RouteComponentProps {}

const Home = () => {
  const [count, setCount] = useState<number>(0);

  const { t } = useTranslation();

  const onClick = () => {
    setCount((prev) => prev + 1);
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div>
        <span>Switch language</span>
        <span onClick={() => changeLanguage('de')}>{t('languages.de')}</span>
        <span onClick={() => changeLanguage('en')}>{t('languages.en')}</span>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <Link to={ERoutes.ONBOARDING}>No sequence yet? Let's get started.</Link>
      </div>
      {count !== 0 && <p>You clicked me {count} times.</p>}
      <button type="button" onClick={onClick}>
        {t('click-me')}
      </button>
    </div>
  );
};

export default Home;
