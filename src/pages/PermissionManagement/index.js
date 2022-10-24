import React from 'react';
import {LIST_PERMISSION_ROUTE} from './declareRoute';

const ListPermission = React.lazy(() => import('./ListPermission'));

export const authorize = [
  {
    path: LIST_PERMISSION_ROUTE,
    element: <ListPermission />,
  },
];

export default {authorize};
