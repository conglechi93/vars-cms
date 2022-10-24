// Resdii custom

import React, {useEffect, useRef} from 'react';
import {Layout} from 'antd';
import {useUrlSearchParams} from 'use-url-search-params';
import './layout.style.less';
import {AppContentView} from '../../index';
import Layouts from './Layouts';
import {LayoutType} from '../../../shared/constants/AppEnums';
import AppScrollbar from '../AppScrollbar';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../utility/AppContextProvider/LayoutContextProvider';
import {useSidebarActionsContext} from '../../utility/AppContextProvider/SidebarContextProvider';
import {
  nullLayoutRoute,
  headerOnlyLayoutRoute,
} from 'shared/constants/AppConst';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {onRefreshedLayoutScroll} from 'redux/actions/Common';
import {matchPath} from 'react-router-dom';

const AppLayout = () => {
  const {navStyle, layoutType} = useLayoutContext();
  const {updateNavStyle} = useLayoutActionsContext();
  const {updateMenuStyle, setSidebarBgImage} = useSidebarActionsContext();
  const [params] = useUrlSearchParams();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const {layoutScrollRefresh} = useSelector(({common}) => common);

  const {pathname} = useLocation();
  const isUseLayout = !nullLayoutRoute.some(
    (item) => RegExp(item).test(pathname) || matchPath(item, pathname),
  );
  const headerOnly = headerOnlyLayoutRoute.some(
    (item) => RegExp(item).test(pathname) || matchPath(item, pathname),
  );

  const AppLayout = Layouts[navStyle];

  useEffect(() => {
    if (layoutType === LayoutType.BOXED) {
      document.body.classList.add('boxedLayout');
      document.body.classList.remove('framedLayout');
    } else if (layoutType === LayoutType.FRAMED) {
      document.body.classList.remove('boxedLayout');
      document.body.classList.add('framedLayout');
    } else {
      document.body.classList.remove('boxedLayout');
      document.body.classList.remove('framedLayout');
    }
  }, [layoutType]);

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, []);

  useEffect(() => {
    if (layoutScrollRefresh) {
      if (scrollRef.current) {
        scrollRef.current.recalculate();
        scrollRef.current.scrollY(0);
      }
      dispatch(onRefreshedLayoutScroll());
    }
  }, [layoutScrollRefresh]);

  return (
    <React.Fragment>
      {isUseLayout ? (
        <AppLayout headerOnly={headerOnly} />
      ) : (
        <Layout className='null-layout'>
          <AppScrollbar ref={scrollRef} className='main-scrollbar'>
            <AppContentView />
          </AppScrollbar>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default React.memo(AppLayout);
