import React from 'react';
import '../index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import ConfirmPhone from './ConfirmPhone';
import {useIntl} from 'react-intl';
import ConfirmOTP from './ConfirmOTP';

const Confirm = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper action="login">
      <AppPageMetadata title={messages['common.login']} />
      <ConfirmPhone />
    </AuthWrapper>
  );
};

const ConfirmO= () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper action="login">
      <AppPageMetadata title={messages['common.login']} />
      <ConfirmOTP />
    </AuthWrapper>
  );
};

export {Confirm, ConfirmO};
