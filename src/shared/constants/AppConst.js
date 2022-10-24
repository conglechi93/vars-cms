import {APPLICATION_SELECTOR_ROUTE} from 'pages/ApplicationManagement/declareRoute';
import {
  FORGET_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_IN_EMAIL_ROUTE,
  SIGN_UP_COMPANY_ROUTE,
  SIGN_IN_OTP_CONFIRM_ROUTE,
  SIGN_IN_OTP_ROUTE,
  SIGN_UP_OTP_CONFIRM_ROUTE,
  SIGN_UP_OTP_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE,
} from 'pages/Auth/declareRoute';

import {
  USER_PROFILE_ROUTE
} from 'pages/ProfileManagement/declareRoute';
import {ERROR_404_ROUTE} from 'pages/errorPages/declareRoute';
import {RECEPTION_ROUTE} from 'pages/SSOReception/declareRoute';
import {
  FooterType,
  LayoutType,
  MenuStyle,
  NavStyle,
  ThemeDirection,
  ThemeMode,
  ThemeStyle,
} from './AppEnums';

const decodeReactAppEnv = (key) => {
  if (process.env?.[key] == null) return {};

  return JSON.parse(process.env?.[key]);
};

export const appConfig = {
  sidebar: {
    borderColor: 'transparent',
    menuStyle: MenuStyle.CURVED_MENU,
    isSidebarBgImage: false,
    sidebarBgImage: null,
    colorSet: {
      sidebarBgColor: 'var(--sidebar-bg)',
      sidebarHeaderColor: 'var(--sidebar-bg)',
      sidebarTextColor: '#fff',
      sidebarMenuSelectedBgColor: 'var(--sidebar-selected-bg)',
      sidebarMenuSelectedTextColor: '#fff',
      mode: ThemeMode.LIGHT,
    },
  },
  themeStyle: ThemeStyle.STANDARD,
  direction: ThemeDirection.LTR,
  themeMode: ThemeMode.SEMI_DARK,
  footerType: FooterType.FLUID,
  navStyle: NavStyle.USER_STANDARD,
  layoutType: LayoutType.FULL_WIDTH,
  footer: false,
  rtlLocale: ['ar'],
  localeContext: {
    locale: 'vi',
  },
};

export const dateFormat = 'DD/MM/YYYY';
export const initialUrl = '/intermediate'; // this url will open after login
export const apiTimeout = 60000;
export const apiHeaders = {
  'Content-Type': 'application/json',
  'Accept':'*/*',
  'Access-Control-Allow-Headers': 'Content-Type,*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
};
export const authOTPTimeout = 60000;
export const defaultSignInUrl = SIGN_IN_OTP_ROUTE;
export const signinOTP = SIGN_IN_OTP_ROUTE;
export const defaultAdminUrl = USER_PROFILE_ROUTE;

export const nullLayoutRoute = [
  //USER_PROFILE_ROUTE,
  FORGET_PASSWORD_ROUTE,
  SIGN_IN_EMAIL_ROUTE,
  SIGN_IN_OTP_ROUTE,
  SIGN_IN_OTP_CONFIRM_ROUTE,
  SIGN_UP_OTP_ROUTE,
  SIGN_UP_COMPANY_ROUTE,
  SIGN_UP_OTP_CONFIRM_ROUTE,
  RESET_PASSWORD_ROUTE,
  RECEPTION_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE,
  initialUrl,
  ERROR_404_ROUTE,
  '/qr/(\\w)+',
];

export const headerOnlyLayoutRoute = [APPLICATION_SELECTOR_ROUTE];

export const notificationSuccessOptions = {
  titleId: 'common.success',
};

export const notificationErrorOptions = {
  titleId: 'common.error',
};

export const loginAttemptShowCaptcha = 5;

export const defaultPageSize = 10;
export const defaultPageOption = {
  page: 1,
  pageSize: defaultPageSize,
};
export const pageSizeOptions = [10, 20, 50, 100];
export const localeConfig = decodeReactAppEnv('REACT_APP_LOCALE_CONFIG');
export const adminRole = 'ADMIN';
export const subAdminRole = 'SUB_ADMIN';
