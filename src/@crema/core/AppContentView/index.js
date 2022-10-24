// Resdii custom

import React from 'react';
import {Layout} from 'antd';
import {AppSuspense} from '../../index';
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages';
import AppErrorBoundary from '../AppErrorBoundary';
import './index.style.less';
import generateRoutes from '../../utility/RouteGenerator';
import {Navigate, Route, Routes} from 'react-router-dom';
import {initialUrl} from '../../../shared/constants/AppConst';
import {useSelector} from 'react-redux';

const {Content} = Layout;

const AppContentView = () => {
  const {isAuthenticated} = useSelector(({auth}) => auth);
  return (
    <Content className='main-content-view'>
      <AppSuspense>
        <AppErrorBoundary>
          {generateRoutes({
            isAuthenticated: isAuthenticated,
            // userRole: user?.role,
            unAuthorizedStructure,
            authorizedStructure,
            anonymousStructure,
          })}
          <Routes>
            <Route path='/' element={<Navigate to={initialUrl} replace />} />
          </Routes>
        </AppErrorBoundary>
      </AppSuspense>
    </Content>
  );
};

export default AppContentView;
