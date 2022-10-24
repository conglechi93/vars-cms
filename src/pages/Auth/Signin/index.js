import React from 'react';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SigninDefault from './SigninDefault';
import {useIntl} from 'react-intl';

const Signin = () => {
  const {messages} = useIntl();
  return (
    <AuthWrapper action="login">
      <AppPageMetadata title={messages['common.login']} />
      <SigninDefault />
    </AuthWrapper>
  );
};

export default Signin;
