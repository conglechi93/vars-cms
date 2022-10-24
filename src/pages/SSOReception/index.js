import React from 'react';
import {RECEPTION_ROUTE} from './declareRoute';

const Reception = React.lazy(() => import('./Reception'));

export const unauthorize = [
  {
    path: RECEPTION_ROUTE,
    element: <Reception />,
  },
];

export default {unauthorize};
