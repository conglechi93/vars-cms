import React from 'react';
import {
    USER_PROFILE_ROUTE,
    USER_CHANGE_EMAIL_ROUTE,
} from './declareRoute';

const Profile = React.lazy(() => import('./Profile'));
const ChangeEmail = React.lazy(() => import('./ChangeEmail'));

export const authorize = [
  {
    path: USER_PROFILE_ROUTE,
    element: <Profile />,
  },
  {
    path: USER_CHANGE_EMAIL_ROUTE,
    element: <ChangeEmail />,
  },
];

export default {authorize};