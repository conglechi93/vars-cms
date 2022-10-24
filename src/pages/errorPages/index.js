import React from 'react';
import {
  ERROR_401_ROUTE,
  ERROR_403_ROUTE,
  ERROR_404_ROUTE,
  ERROR_500_ROUTE,
  ERROR_COMING_ROUTE,
  ERROR_MAINTAIN_ROUTE,
} from './declareRoute';

const Error401 = React.lazy(() => import('./Error401'));
const Error404 = React.lazy(() => import('./Error404'));
const Error500 = React.lazy(() => import('./Error500'));
const ComingSoon = React.lazy(() => import('./ComingSoon'));
const Maintenance = React.lazy(() => import('./Maintenance'));
const Error403 = React.lazy(() => import('./Error403'));

export const errorPagesConfigs = [
  {
    path: ERROR_401_ROUTE,
    element: <Error401 />,
  },
  {
    path: ERROR_403_ROUTE,
    element: <Error403 />,
  },
  {
    path: ERROR_404_ROUTE,
    element: <Error404 />,
  },
  {
    path: ERROR_500_ROUTE,
    element: <Error500 />,
  },
  {
    path: ERROR_COMING_ROUTE,
    element: <ComingSoon />,
  },
  {
    path: ERROR_MAINTAIN_ROUTE,
    element: <Maintenance />,
  },
];
