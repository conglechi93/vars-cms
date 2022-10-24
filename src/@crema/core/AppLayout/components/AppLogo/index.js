import React from 'react';
import './index.style.less';
import PropTypes from 'prop-types';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import clsx from 'clsx';
import Logo from '@assets/logo-header.svg';
import LogoMini from '@assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import {initialUrl} from 'shared/constants/AppConst';

const AppLogo = ({hasSidebarColor, onClick, mini}) => {
  const {sidebarColorSet} = useSidebarContext();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(initialUrl)}
      className={clsx(
        'app-logo',
        {mini},
        {dark: hasSidebarColor && sidebarColorSet.mode === 'dark'},
      )}>
      {mini ? (
        <img
          onClick={onClick}
          src={LogoMini}
          
          width='100px'
          height='auto'
          alt='logo'
        />
      ) : (
        <img
          onClick={onClick}
          src={Logo}
          width='230px'
          height='auto'
          alt='logo'
        />
      )}
    </div>
  );
};

export default AppLogo;

AppLogo.propTypes = {
  hasSidebarColor: PropTypes.bool,
  onClick: PropTypes.func,
  mini: PropTypes.bool,
};

AppLogo.defaultProps = {
  mini: false,
};
