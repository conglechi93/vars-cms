import {
  CHANGE_ADRESS_OTP,
  CONFIRM_FB_EMAIL,
  CONFIRM_FORGOT_PASSWORD_OTP,
  CONFIRM_LOGIN_OTP,
  CONFIRM_SIGNUP_OTP,
  INCREASE_LOGIN_ATTEMPT,
  LOGIN_WITH_EMAIL_PASSWORD,
  LOGIN_WITH_OAUTH,
  LOGOUT,
  REQUEST_FORGOT_PASSWORD_OTP,
  REQUEST_LOGIN_OTP,
  REQUEST_SIGNUP_OTP,
  RESET_LOGIN_ATTEMPT,
  RESET_PASSWORD,
  SET_LOGIN_REDIRECT_TO,
  CLEAN_CONFIRM_FB_EMAIL,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  WIPE_USER,
  CONFIRM_SIGNUP_GOOGLE_PHONE,
  TYPE_CONFIRM_OTP,
  CHANGE_PHONE_STATUS,
  GET_CAPTCHA_SUCCESS,
  CHECK_CAPTCHA_SUCCESS,
  CHECK_CAPTCHA_FAIL
} from 'shared/constants/ActionTypes';
import {authOTPTimeout} from 'shared/constants/AppConst';
//import colorSet from 'shared/constants/ColorSets';

const initialState = {
  isAuthenticated: false,
  phoneNumber: null,
  password: null,
  captcha: null,
  user: null,
  waitOTPConfirm: false,
  waitPhoneConfirm: false,
  OTPTimeout: 0,
  role: null,
  sessionToken: null,
  loginRedirectTo: null,
  loginAttempt: 0,
  loginScreen: -1,
  waitFbEmailConfirm: false,
  fbAccessToken: null,
  fbUserId: null,
  loading: true,
  profile: null,
  isLoginWithOAuth: false,
  error: null,
  typeSignup: null,
  captchaImage: null,
  captchaId: null,
  tokenCaptcha: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_CAPTCHA_SUCCESS:
      return {
        ...state,
        tokenCaptcha: action.payload.tokenCaptcha,
      };
    case CHECK_CAPTCHA_FAIL:
      return {
        ...state,
        tokenCaptcha: null,
      };

    case GET_CAPTCHA_SUCCESS:
      return {
        ...state,
        captchaImage: action.payload.captchaImage,
        captchaId: action.payload.captchaId,
      };
    case CHANGE_PHONE_STATUS:
      return {
        ...state,
        waitPhoneConfirm: false,
      };
    case TYPE_CONFIRM_OTP:
      return {
        ...state,
        typeSignup: action.payload.typeSignup,
      };
    case CONFIRM_SIGNUP_GOOGLE_PHONE:
      console.log(action.payload);
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
        waitPhoneConfirm: true,
      };
    case LOGIN_WITH_EMAIL_PASSWORD:
      return {
        ...state,
        user: action.payload.email,
        isAuthenticated: true,
        sessionToken: action.payload.sessionToken,
        loginScreen: 0,
      };
    case REQUEST_LOGIN_OTP:
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
        password: action.payload.password,
        waitOTPConfirm: true,
        OTPTimeout: state.OTPTimeout ? state.OTPTimeout + 1 : authOTPTimeout,
      };
    case CONFIRM_LOGIN_OTP:
      return {
        ...state,
        waitOTPConfirm: false,
        OTPTimeout: 0,
        isAuthenticated: true,
        sessionToken: action.payload.sessionToken,
        loginScreen: 1,
      };
    case REQUEST_SIGNUP_OTP:
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
        password: action.payload.password,
        captcha: action.payload.captcha,
        waitOTPConfirm: true,
        OTPTimeout: state.OTPTimeout ? state.OTPTimeout + 1 : authOTPTimeout,
        tokenCaptcha: null
      };
    case CONFIRM_SIGNUP_OTP:
      return {
        ...state,
        waitOTPConfirm: false,
        OTPTimeout: 0,
        sessionToken: action.payload.sessionToken,
      };
    case REQUEST_FORGOT_PASSWORD_OTP:
      return {
        ...state,
        user: action.payload.email,
        waitOTPConfirm: true,
        OTPTimeout: state.OTPTimeout ? state.OTPTimeout + 1 : authOTPTimeout,
      };
    case CONFIRM_FORGOT_PASSWORD_OTP:
      return {
        ...state,
        waitOTPConfirm: false,
        OTPTimeout: 0,
        user: action.payload,
      };
    case LOGIN_WITH_OAUTH:
      console.log("set session token");
      console.log("action.payload",action.payload);
      return {
        ...state,
        isLoginWithOAuth: true,
        //user: action.payload.email,
        sessionToken: action.payload.sessionToken,
        //isAuthenticated: true,
        loginScreen: 1,
      };
    case CONFIRM_FB_EMAIL:
      return {
        ...state,
        waitFbEmailConfirm: true,
        fbAccessToken: action.payload.accessToken,
        fbUserId: action.payload.userId,
      };
    case CLEAN_CONFIRM_FB_EMAIL:
      return {
        ...state,
        waitFbEmailConfirm: false,
        fbAccessToken: null,
        fbUserId: null,
      };
    case CHANGE_ADRESS_OTP:
      return {
        ...state,
        //type: action.payload.type,
        waitOTPConfirm: false,
        OTPTimeout: 0,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        sessionToken: null,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoginWithOAuth: false,
        sessionToken: null,
      };
    case SET_LOGIN_REDIRECT_TO:
      return {
        ...state,
        loginRedirectTo: action.payload,
      };
    case RESET_LOGIN_ATTEMPT:
      return {
        ...state,
        isLoginWithOAuth: false,
        waitPhoneConfirm: false,
        loginAttempt: 0,
      };
    case INCREASE_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: state.loginAttempt + 1,
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        profile: action.payload.data,
        error: null,
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: action.payload,
      };
    case WIPE_USER:
      return initialState;
    default:
      return state;
  }
};
export default authReducer;
