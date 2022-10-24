import React from 'react';
import {
  FORGET_PASSWORD_CONFIRM_ROUTE,
  FORGET_PASSWORD_INPUT_ROUTE,
  FORGET_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_IN_EMAIL_ROUTE,
  SIGN_IN_OTP_CONFIRM_ROUTE,
  SIGN_IN_OTP_ROUTE,
  SIGN_UP_PASSWORD_ROUTE,
  SIGN_UP_OTP_CONFIRM_ROUTE,
  SIGN_UP_OTP_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE,
  SIGN_UP_COMPANY_ROUTE,
} from './declareRoute';

const Signin = React.lazy(() => import('./Signin'));
const SigninOTP = React.lazy(() =>
  import('./SigninOTP').then((module) => ({ default: module.Signin })),
);
const SigninConfirmOTP = React.lazy(() =>
  import('./SigninOTP').then((module) => ({ default: module.Confirm })),
);
const SignupOTP = React.lazy(() =>
  import('./SignupOTP').then((module) => ({ default: module.Signup })),
);
const SignupConfirmOTP = React.lazy(() =>
  import('./SignupOTP').then((module) => ({ default: module.Confirm })),
);

const SignupCompanyForm = React.lazy(() =>
  import('./SignupOTP').then((module) => ({default: module.SignupCompanyForm})),
);


const ForgotPassword = React.lazy(() =>
  import('./ForgotPassword').then((module) => ({
    default: module.ForgotPassword,
  })),
);
const ForgotPasswordConfirm = React.lazy(() =>
  import('./ForgotPassword').then((module) => ({ default: module.Confirm })),
);

const ForgotPasswordInput = React.lazy(() =>
  import('./ForgotPassword').then((module) => ({ default: module.ForgotPasswordInput })),
);

const ConfirmPhone = React.lazy(() =>
  import('./SigninGoogle').then((module) => ({ default: module.Confirm })),
);

const ConfirmPhoneOTP = React.lazy(() =>
  import('./SigninGoogle').then((module) => ({ default: module.ConfirmO })),
);
const ResetPassword = React.lazy(() => import('./ResetPassword'));

export const authRouteConfig = [
  {
    path: SIGN_IN_EMAIL_ROUTE,
    element: <Signin />,
  },
  {
    path: SIGN_IN_OTP_ROUTE,
    element: <SigninOTP />,
  },
  {
    path: SIGN_IN_OTP_CONFIRM_ROUTE,
    element: <SigninConfirmOTP />,
  },
  {
    path: SIGN_UP_OTP_ROUTE,
    element: <SignupOTP />,
  },
  {
    path: SIGN_UP_COMPANY_ROUTE,
    element: <SignupCompanyForm />,
  },
  {
    path: SIGN_UP_PASSWORD_ROUTE,
    element: <SignupOTP />,
  },
  {
    path: SIGN_UP_OTP_CONFIRM_ROUTE,
    element: <SignupConfirmOTP />,
  },
  {
    path: FORGET_PASSWORD_ROUTE,
    element: <ForgotPassword />,
  },
  {
    path: FORGET_PASSWORD_INPUT_ROUTE,
    element: <ForgotPasswordInput />,
  },
  {
    path: FORGET_PASSWORD_CONFIRM_ROUTE,
    element: <ForgotPasswordConfirm />,
  },
  {
    path: RESET_PASSWORD_ROUTE,
    element: <ResetPassword />,
  },
  {
    path: SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE,
    element: <ConfirmPhone />,
  },
  {
    path: SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE,
    element: <ConfirmPhoneOTP />,
  },

];
