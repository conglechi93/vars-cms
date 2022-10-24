import {errorPagesConfigs} from './errorPages';
import {authRouteConfig} from './Auth';
import {defaultSignInUrl, initialUrl} from '../shared/constants/AppConst';
import React from 'react';
import accountConfig from './AccountManagement';
import applicationConfig from './ApplicationManagement';
import permissionConfig from './PermissionManagement';
import receptionConfig from './SSOReception';
import profileConfig from './ProfileManagement';
import {Navigate} from 'react-router-dom';
import {ERROR_404_ROUTE} from './errorPages/declareRoute';
import Intermediate from './Intermediate';

const Error403 = React.lazy(() => import('./errorPages/Error403'));

const authorizedStructure = {
  fallbackPath: defaultSignInUrl,
  unAuthorizedComponent: <Error403 />,
  routes: [
    {
      path: initialUrl,
      element: <Intermediate />,
    },
    ...accountConfig.authorize,
    ...applicationConfig.authorize,
    ...permissionConfig.authorize,
    ...profileConfig.authorize,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: [...authRouteConfig],
};

const anonymousStructure = {
  routes: [
    ...receptionConfig.unauthorize,
    ...errorPagesConfigs.concat([
      {
        path: '*',
        element: <Navigate to={ERROR_404_ROUTE} replace />,
      },
    ]),
  ],
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
