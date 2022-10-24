import React from 'react';
import '../index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import SignupOTP from './SignupOTP';
import {useIntl} from 'react-intl';
import ConfirmOTP from './ConfirmOTP';

const Signup = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper>
      <AppPageMetadata title={messages['common.signup']} />
      <SignupOTP />
    </AuthWrapper>
  );
};

const Confirm = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper>
      <AppPageMetadata title={messages['common.signup']} />
      <ConfirmOTP />
    </AuthWrapper>
  );
};

export {Signup, Confirm};
