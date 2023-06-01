import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
// @ts-ignore
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

const LANGUAGES: string[] = ['de', 'en'];

const LANGUAGE_COUNTRY_MAP: { [key: string]: string } = {
  de: 'DE',
  en: 'US',
};

const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <ReactCountryFlag
            countryCode={LANGUAGE_COUNTRY_MAP[i18n.language.split('-')[0]]}
            style={{
              fontSize: '20px',
            }}
          />
        }
        variant="outline"
        backgroundColor="rgba(255,255,255, 0.8)"
      />
      <MenuList>
        {LANGUAGES.map((language: string) => (
          <MenuItem
            key={language}
            onClick={() => {
              if (i18n.language !== language) {
                changeLanguage(language);
              }
            }}
            icon={<ReactCountryFlag countryCode={LANGUAGE_COUNTRY_MAP[language]} />}
          >
            {t(`languages.${language}`)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitch;
