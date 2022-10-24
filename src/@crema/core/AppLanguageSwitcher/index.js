import React from 'react';

import PropTypes from 'prop-types';
import {Dropdown, Menu} from 'antd';
import './index.style.less';
import {ThemeDirection} from '../../../shared/constants/AppEnums';
import {
  useLocaleActionsContext,
  useLocaleContext,
} from '../../utility/AppContextProvider/LocaleContextProvide';
import {useLayoutActionsContext} from '../../utility/AppContextProvider/LayoutContextProvider';
import {IoLanguageOutline} from '@react-icons/all-files/io5/IoLanguageOutline';
import {localeConfig} from 'shared/constants/AppConst';
import IntlMessages from '@crema/utility/IntlMessages';

const AppLanguageSwitcher2 = () => {
  const {rtlLocale, locale} = useLocaleContext();
  const {updateLocale} = useLocaleActionsContext();
  const {updateDirection} = useLayoutActionsContext();

  const changeLanguage = (language) => {
    if (rtlLocale.indexOf(language.locale) !== -1) {
      updateDirection(ThemeDirection.RTL);
    } else {
      updateDirection(ThemeDirection.LTR);
    }
    updateLocale(language);
  };

  const menu = (
    <Menu id='language-switcher'>
      {(localeConfig?.enabled || []).map((code, index) => (
        <Menu.Item key={index} onClick={() => changeLanguage(code)}>
          <div className='langItem'>
            <i className={`flag flag-24 flag-${code}`} />
            <h4>
              <IntlMessages id={`locale.${code}`} />
            </h4>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        overlayStyle={{zIndex: 1052}}>
        <a
          className='ant-dropdown-link langBtn'
          onClick={(e) => e.preventDefault()}>
          <span className='lang-icon'>
            <IoLanguageOutline />
          </span>
          <span className='lang-text'>{locale.name}</span>
        </a>
      </Dropdown>
    </>
  );
};

const AppLanguageSwitcher = () => <></>;
export {AppLanguageSwitcher2};
export default AppLanguageSwitcher;

AppLanguageSwitcher.defaultProps = {
  iconOnly: false,
};

AppLanguageSwitcher.propTypes = {
  iconOnly: PropTypes.bool,
};
