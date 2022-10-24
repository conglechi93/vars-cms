import React from 'react';
import '../index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SigninOTP from './SigninOTP';
import {useIntl} from 'react-intl';
import ConfirmOTP from './ConfirmOTP';

const Signin = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper action="login">
      <AppPageMetadata title={messages['common.login']} />
      <SigninOTP />
    </AuthWrapper>
  );
};

const Confirm = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper action="login">
      <AppPageMetadata title={messages['common.login']} />
      <ConfirmOTP />
    </AuthWrapper>
  );
};

export {Signin, Confirm};
