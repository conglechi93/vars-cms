import {localeConfig} from 'shared/constants/AppConst';
import enLang from './entries/en_US';
import viLang from './entries/vi_VN';

const extraMessage = (lang, code) => ({
  ...lang,
  messages: {
    ...lang.messages,
    ...localeConfig?.labels?.[code],
  },
});

const AppLocale = {
  en: extraMessage(enLang, 'en'),
  vi: extraMessage(viLang, 'vi'),
};

export default AppLocale;
