import React from 'react';
import '../index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import ForgotPasswordOTP from './ForgotPasswordOTP';
import {useIntl} from 'react-intl';
import ConfirmOTP from './ConfirmOTP';
import ForgotPasswordInputNewPassword from './ForgetPassword';

const ForgotPassword = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper>
      <AppPageMetadata title={messages['common.forgotPassword']} />
      <ForgotPasswordOTP />
    </AuthWrapper>
  );
};

const Confirm = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper>
      <AppPageMetadata title={messages['common.forgotPassword']} />
      <ConfirmOTP />
    </AuthWrapper>
  );
};

const ForgotPasswordInput = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper>
      <AppPageMetadata title={messages['common.forgotPassword']} />
      <ForgotPasswordInputNewPassword />
    </AuthWrapper>
  );
};

export {ForgotPassword, Confirm, ForgotPasswordInput};
