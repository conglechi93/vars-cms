import React from 'react';
import './index.style.less';
import PropTypes from 'prop-types';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import MainSidebar from '../components/MainSidebar';
import AppLogo from '../components/AppLogo';

const AppSidebar = ({isCollapsed}) => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <MainSidebar
      className={clsx('app-standard-sidebar', {
        'standard-sidebar-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsed={isCollapsed}>
      <AppScrollbar
        className='app-standard-sidebar-scrollbar'
        scrollToTop={false}>
        {/* <AppLogo /> */}
        <AppVerticalMenu />
      </AppScrollbar>
    </MainSidebar>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
};
