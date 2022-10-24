import React from 'react';
import {LIST_CATEGORY_ROUTE} from './declareRoute';

const ListCategory = React.lazy(() => import('./ListCategory'));

export const authorize = [
  {
    path: LIST_CATEGORY_ROUTE,
    element: <ListCategory />,
  },
];

export default {authorize};
