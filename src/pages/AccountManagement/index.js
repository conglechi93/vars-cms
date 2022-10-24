import React from 'react';
import {AM_LIST_ROLE_ROUTE, 
  AM_LIST_USER_ROUTE,
} from './declareRoute';

const ListUser = React.lazy(() => import('./ListUser'));
const ListRole = React.lazy(() => import('./ListRole'));
//const Profile = React.lazy(() => import('./Profile'));
export const authorize = [
  {
    path: AM_LIST_USER_ROUTE,
    element: <ListUser />,
  },
  {
    path: AM_LIST_ROLE_ROUTE,
    element: <ListRole />,
  },
];

export default {authorize};
