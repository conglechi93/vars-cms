import React from 'react';
import '../index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import ResetPasswordPage from './ResetPassword';

const ResetPassword = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper>
      <AppPageMetadata title={messages['common.resetPassword']} />
      <ResetPasswordPage />
    </AuthWrapper>
  );
};

export default ResetPassword;
