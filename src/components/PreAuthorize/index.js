import PropTypes from 'prop-types';
import {AppLoader} from '@crema';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserInfo} from 'redux/actions/Auth';
import {matchPath, useLocation, useNavigate} from 'react-router-dom';
import {onSelectApp} from 'redux/actions/UserApplication';
import {AppNavContext} from '@crema/core/AppLayout/components/AppVerticalNav';
import Route from 'utils/Route';
import {defaultAdminUrl} from 'shared/constants/AppConst';
import {isEqual} from 'lodash';

// Prevent unauthorize request on refreshing
export const PreAuthorize = ({children}) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const {error} = useSelector(({auth}) => auth);
  const {routeConfig} = useContext(AppNavContext);
  const {pathname} = useLocation();
  const {navParam} = useSelector(({userApplication}) => userApplication);
  const navigate = useNavigate();

  useEffect(() => {
    const match = matchPath(
      {
        path: '/app/:appId/*',
        strict: true,
      },
      pathname,
    );
    if (match) {
      const {params} = match;
      const {appId} = params;
      dispatch(onSelectApp(appId));
    } else {
      dispatch(onGetUserInfo());
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded && !isEqual(navParam, {})) {
      const routes = Route.flatMapPath(routeConfig);
      if (
        !routes.some((route) =>
          matchPath(
            {
              path: route,
              strict: true,
            },
            pathname,
          ),
        )
      ) {
        navigate(defaultAdminUrl);
      }
      setLoaded(true);
    }
  }, [navParam]);

  useEffect(() => {
    if (error) {
      setLoaded(true);
    }
  }, [error]);

  return !loaded ? <AppLoader /> : children;
};

PreAuthorize.propTypes = {
  children: PropTypes.node,
};
