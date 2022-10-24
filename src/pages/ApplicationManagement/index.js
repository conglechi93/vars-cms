import React from 'react';
import {
  APPLICATION_SELECTOR_ROUTE,
  LIST_APPLICATION_ROUTE,
} from './declareRoute';

import {
  CHANGE_PASSWORD_ROUTE,
  USER_PROFILE_ROUTE
} from '../ProfileManagement/declareRoute'
const ChangePassword = React.lazy(() => import('../ProfileManagement/ChangePassword'));
const ListApplication = React.lazy(() => import('./ListApplication'));
const AppSelector = React.lazy(() => import('./AppSelector'));
const Profile = React.lazy(() => import('../ProfileManagement/Profile'))

export const authorize = [
  {
    path: LIST_APPLICATION_ROUTE,
    element: <ListApplication />,
  },
  {
    path: APPLICATION_SELECTOR_ROUTE,
    element: <AppSelector />,
  },
  {
    path: USER_PROFILE_ROUTE,
    element: <Profile />,
  },
  {
    path: CHANGE_PASSWORD_ROUTE,
    element: <ChangePassword />,
  }
];

export default {authorize};
