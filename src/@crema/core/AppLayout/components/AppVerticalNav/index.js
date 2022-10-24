import React, {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import {getRouteMenus} from '../../../../utility/VerticalMenuUtils';
import clsx from 'clsx';
import './index.style.less';
import defaultConfig from '../../../../utility/AppContextProvider/defaultConfig';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import {MenuStyle} from '../../../../../shared/constants/AppEnums';
import PropTypes from 'prop-types';
import routesConfig from 'pages/routeConfig';
import compact from 'lodash/compact';
import Route from 'utils/Route';
import cloneDeep from 'lodash/cloneDeep';
import {useSelector} from 'react-redux';

const AppNavContext = createContext();

const AppNavProvider = ({children}) => {
  const [routeConfig, setRouteConfig] = useState(cloneDeep(routesConfig));
  const {exclusiveNavId, navParam} = useSelector(
    ({userApplication}) => userApplication,
  );

  const filterExclude = (arr, excludes) => {
    return compact(
      arr.map((item) => {
        if (excludes.includes(item.id)) return null;
        if (item.children && item.children.length > 0)
          return {
            ...item,
            children: compact(filterExclude(item.children, excludes)),
          };
        else return item;
      }),
    );
  };

  const applyParam = (arr, params) => {
    return arr.map((item) => {
      if (item.path) item.path = Route.replaceParam(item.path, params);
      if (item.children && item.children.length > 0)
        return {
          ...item,
          children: applyParam(item.children, params),
        };
      return item;
    });
  };

  useEffect(() => {
    const filterRouteConfig =
      filterExclude(routesConfig, exclusiveNavId ?? []) || [];
    const newRouteConfig =
      applyParam(cloneDeep(filterRouteConfig), navParam || {}) || [];
    setRouteConfig(newRouteConfig);
  }, [exclusiveNavId, navParam]);

  const getFirstRoute = (routes) => {
    const first = routes?.[0];
    return first?.path || first?.children?.[0]?.path || '';
  };
  const getFirstOriginalRoute = () => {
    const filterOriginalRouteConfig =
      filterExclude(routesConfig, exclusiveNavId ?? []) || [];
    return getFirstRoute(filterOriginalRouteConfig);
  };

  const getFirstModifiedRoute = () => {
    return getFirstRoute(routeConfig);
  };

  return (
    <AppNavContext.Provider
      value={{routeConfig, getFirstOriginalRoute, getFirstModifiedRoute}}>
      {children}
    </AppNavContext.Provider>
  );
};

AppNavProvider.propTypes = {
  children: PropTypes.node,
};

const AppVerticalNav = () => {
  const {menuStyle, sidebarColorSet} = useSidebarContext();
  const {pathname} = useLocation();
  const selectedKeys = pathname.substr(1).split('/');
  const defaultOpenKeys = selectedKeys[0];
  const [openKeys, setOpenKeys] = useState([defaultOpenKeys]);
  const {routeConfig} = useContext(AppNavContext);

  useEffect(() => {
    setOpenKeys([selectedKeys[selectedKeys.length - 2]]);
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const menu = getRouteMenus(routeConfig);

  return (
    <Menu
      theme={sidebarColorSet.mode}
      mode='inline'
      className={clsx('app-main-sidebar-menu ', {
        'menu-rounded': menuStyle === MenuStyle.ROUNDED,
        'menu-rounded rounded-menu-reverse':
          menuStyle === MenuStyle.ROUNDED_REVERSE,
        'menu-rounded standard-menu': menuStyle === MenuStyle.STANDARD,
        'menu-rounded curved-menu': menuStyle === MenuStyle.CURVED_MENU,
        'bg-color-menu':
          sidebarColorSet.sidebarBgColor !==
          defaultConfig.sidebar.colorSet.sidebarBgColor,
      })}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[selectedKeys[selectedKeys.length - 1]]}>
      {menu}
    </Menu>
  );
};

export {AppNavContext, AppNavProvider};
export default AppVerticalNav;
