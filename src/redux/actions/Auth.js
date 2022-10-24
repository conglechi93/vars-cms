import {
  CHANGE_ADRESS_OTP,
  CLEAN_STATE,
  CONFIRM_FB_EMAIL,
  CONFIRM_FORGOT_PASSWORD_OTP,
  CONFIRM_LOGIN_OTP,
  CONFIRM_SIGNUP_OTP,
  FETCH_ERROR,
  INCREASE_LOGIN_ATTEMPT,
  LOGIN_WITH_OAUTH,
  LOGOUT,
  REQUEST_FORGOT_PASSWORD_OTP,
  //REQUEST_LOGIN_OTP,
  REQUEST_SIGNUP_OTP,
  RESET_LOGIN_ATTEMPT,
  RESET_PASSWORD,
  SET_LOGIN_REDIRECT_TO,
  SHOW_MESSAGE,
  CLEAN_CONFIRM_FB_EMAIL,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  WIPE_USER,
  CONFIRM_SIGNUP_GOOGLE_PHONE,
  CHANGE_PHONE_STATUS,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  GET_CAPTCHA_SUCCESS,
  CHECK_CAPTCHA_FAIL,
  CHECK_CAPTCHA_SUCCESS,
  OTP_RESET,
} from 'shared/constants/ActionTypes';
import {
  FORGET_PASSWORD_CONFIRM_OTP_API,
  FORGET_PASSWORD_REQUEST_OTP_API,
  GET_USER_INFO_API,
  LOGIN_BY_PASSWORD_API,
  LOGIN_FACEBOOK_API,
  LOGIN_GOOGLE_API,
  LOGIN_REQUEST_OTP_API,
  LOGOUT_API,
  REGISTER_FACEBOOK_API,
  REGISTER_GOOGLE_API,
  RESET_PASSWORD_API,
  SIGNUP_CONFIRM_OTP_API,
  SIGNUP_REQUEST_OTP_API,
  REQUEST_PHONE_OAUTH_API,
  VERIFY_PHONE_OAUTH_API,
  VERIFY_FACEBOOK_API,
  CHAGE_PASSWORD_API,
  OTP_REQUEST_API,
  OTP_VERIFY_API,
  GET_CAPTCHA,
  CHECK_CAPTCHA
} from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { appIntl } from '@crema/utility/helper/Utils';
import { logoutFacebook } from 'hooks/useOAuthLogin';
import { REQUEST_MUTED, REQUEST_IGNORE_401_ERROR } from '@api/RequestEnum';
import { REQUEST_MUTE_ON_ERROR } from '@api/RequestEnum';
import { showMessage } from './Common';
import axios from 'axios';
import { InFoViewActions } from '@crema/core/AppInfoView/InfoViewReducer';
// import {useNavigate} from 'react-router-dom';
// import {defaultSignInUrl} from 'shared/constants/AppConst';


export const onCheckCaptcha = ({captchaId,captchaValue}) => {
  return (dispatch) => {
    const siteKey = "fa3c2ce8a3382805700aa79c02b92b99";
    API.post(CHECK_CAPTCHA, {siteKey,captchaId,captchaValue})
      .then(({data}) => {
        const tokenCaptcha = data.token;
        dispatch({ type: CHECK_CAPTCHA_SUCCESS, payload: {tokenCaptcha}});
      })
      .catch((err) => {
        // if (err?.response?.status == 400)
        //   dispatch({ type: INCREASE_LOGIN_ATTEMPT });
        console.log("err",err);
        dispatch({ type: CHECK_CAPTCHA_FAIL});
      });
    
  };
};



export const onGetCaptcha = () => {
  return (dispatch) => {
    const siteKey = "fa3c2ce8a3382805700aa79c02b92b99";
    const height = "50";
    const width = "150";
    API.post(GET_CAPTCHA, {siteKey, height, width})
      .then(({data}) => {
        const captchaImage = data.captchaImage;
        const captchaId = data.captchaId;
        dispatch({ type: GET_CAPTCHA_SUCCESS, payload: {captchaImage,captchaId}});
      })
      .catch((err) => {
        if (err?.response?.status == 400)
          dispatch({ type: INCREASE_LOGIN_ATTEMPT });
      });
    
  };
};


export const onLoginWithEmail = ({ email, password, captcha }) => {
  return (dispatch) => {
    console.log(dispatch);
    API.post(LOGIN_BY_PASSWORD_API, { email, password, captcha })
      .then(({ data }) => {
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data } });
        dispatch({ type: RESET_LOGIN_ATTEMPT });
      })
      .catch((err) => {
        if (err?.response?.status == 400)
          dispatch({ type: INCREASE_LOGIN_ATTEMPT });
      });
  };
};

export const onLoginWithOTP = ({ phoneNumber, password, captcha }) => {
  return (dispatch) => {
    API.post(LOGIN_REQUEST_OTP_API, { phoneNumber, password, captcha })
      .then(({ data }) => {

        dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data } });
        dispatch({ type: CONFIRM_LOGIN_OTP, payload: {} });
      })
      .catch(() => {
        dispatch({ type: CHANGE_ADRESS_OTP });
      });
  };
};

export const onLoginWithGoogle = (oauthCode) => {
  return (dispatch) => {
    console.log(dispatch, oauthCode);
    API.post(LOGIN_GOOGLE_API, { oauthCode }).then(
      ({ data }) => {
        console.log(dispatch, data);
        if (data.others.phoneVerified) {
          dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data } });
        }
        else {
          dispatch({ type: LOGIN_WITH_OAUTH, payload: {} });
        }
        dispatch({ type: RESET_LOGIN_ATTEMPT });
      },
    );
  };
};


export const onRegisterWithGoogle = (oauthCode) => {

  return (dispatch) => {
    console.log(dispatch);
    API.post(REGISTER_GOOGLE_API, { oauthCode }).then(
      ({ sessionToken, ...userInfo }) => {
        console.log("sessionToken", sessionToken);
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: { userInfo } });
        //dispatch({type: LOGIN_WITH_OAUTH, payload: {sessionToken}});
      },
    )
      .catch(() => {
        dispatch({ type: CHANGE_ADRESS_OTP });
      });
  };
};


export const onRegisterWithFacebook = (userId, accessToken) => {
  return (dispatch) => {
    API.post(
      REGISTER_FACEBOOK_API,
      { userId, accessToken },
      { REQUEST_MUTE_ON_ERROR },
    )
      .then(({ email, sessionToken }) => {
        console.log(email, sessionToken);
        //dispatch({type: LOGIN_WITH_OAUTH, payload: {email, sessionToken}});
      })
      .catch((err) => {
        if (err.message === 'EMAIL_NULL')
          dispatch({ type: CONFIRM_FB_EMAIL, payload: { userId, accessToken } });
        else dispatch({ type: FETCH_ERROR, payload: err.message });
      });
  };
};

export const onLoginWithFacebook = (userId, accessToken) => {
  return (dispatch) => {
    API.post(LOGIN_FACEBOOK_API, { userId, accessToken }).then(
      ({ data }) => {
        if (data.others.phoneVerified) {
          dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data } });
        }
        else {
          dispatch({ type: LOGIN_WITH_OAUTH, payload: {} });
        }
        dispatch({ type: RESET_LOGIN_ATTEMPT });
      },
    );
  };
};

export const onStopSignupWithFacebook = () => {
  return (dispatch) => {
    dispatch({ type: CLEAN_CONFIRM_FB_EMAIL });
  };
};

export const onConfirmPhoneWithGoogle = ({ phoneNumber, captcha }) => {
  console.log(phoneNumber, captcha);
  return (dispatch) => {
    API.post(VERIFY_PHONE_OAUTH_API, { phoneNumber, captcha }).then(
      ({ data }) => {
        console.log(dispatch, data);
        //dispatch({type: GET_USER_INFO_SUCCESS, payload: {data}});
      },
    );
  };
};

export const onConfirmEmailWithFacebook = ({ email, captcha }) => {
  return (dispatch, getState) => {
    const { fbAccessToken: accessToken, fbUserId: userId } = getState().auth;
    API.post(VERIFY_FACEBOOK_API, { email, captcha, accessToken, userId }).then(
      () => {
        dispatch({ type: REQUEST_SIGNUP_OTP, payload: { email } });
      },
    );
  };
};

export const onConfirmOTPWithFacebook = (email, otp) => {
  return (dispatch, getState) => {
    const { fbAccessToken: accessToken, fbUserId: userId } = getState().auth;
    API.post(REGISTER_FACEBOOK_API, { email, otp, accessToken, userId }).then(
      ({ sessionToken, ...userInfo }) => {
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data: { userInfo } } });
        dispatch({ type: CLEAN_CONFIRM_FB_EMAIL });
        dispatch({ type: CONFIRM_LOGIN_OTP, payload: { sessionToken } });
      },
    );
  };
};


export const onSignupWithOTP = ({ phoneNumber, password, captcha }) => {
  return (dispatch) => {

    API.post(SIGNUP_REQUEST_OTP_API, { phoneNumber, password, captcha })
      .then(() => {
        dispatch({ type: REQUEST_SIGNUP_OTP, payload: { phoneNumber, password, captcha } });
      })
      .catch(() => {
        dispatch({ type: CHANGE_ADRESS_OTP });
      });
  };
};

export const onConfirmSignupOTP = (phoneNumber, password, captcha, otp) => {
  const { messages } = appIntl();
  return (dispatch) => {
    API.post(SIGNUP_CONFIRM_OTP_API, {
      phoneNumber,
      password,
      captcha,
      otp,
    }).then(({ sessionToken }) => {
      dispatch({ type: SHOW_MESSAGE, payload: messages['common.successCreate'] });
      dispatch({ type: CONFIRM_SIGNUP_OTP, payload: { sessionToken } });
    });
  };
};

// /sso-module/api/auth/register/oauth/request
export const onConfirmPhoneNumber = ({ phoneNumber, captcha }) => {
  return (dispatch) => {
    API.post(REQUEST_PHONE_OAUTH_API, {
      phoneNumber,
      captcha,
    }).then(() => {
      dispatch({ type: CONFIRM_SIGNUP_GOOGLE_PHONE, payload: { phoneNumber } });
    });
  };
};

// /sso-module/api/auth/register/oauth/verify
export const onConfirmLoginOTP = (phoneNumber, otp) => {
  console.log(phoneNumber, otp);
  return (dispatch) => {
    API.post(VERIFY_PHONE_OAUTH_API, {
      phoneNumber,
      otp,
    }).then(({ data }) => {
      dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data } });
      dispatch({ type: CONFIRM_LOGIN_OTP, payload: {} });
    });
  };
};

export const onForgotPassword = ({ phoneNumber, newPassword, otpToken }) => {
  return (dispatch) => {
    const { messages } = appIntl();
    API.post(FORGET_PASSWORD_REQUEST_OTP_API, { phoneNumber, newPassword, otpToken })
      .then((data) => {
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
        dispatch({type: OTP_RESET})
      })
      .catch((e) => {
        dispatch({ type: SHOW_MESSAGE, payload: messages['common.error'] });
      });
  };
};



export const onConfirmForgotPasswordOTP = (email, otp, newPassword) => {
  return (dispatch) => {
    API.post(FORGET_PASSWORD_CONFIRM_OTP_API, {
      email,
      otp,
      newPassword,
    }).then(() => {
      dispatch({ type: CONFIRM_FORGOT_PASSWORD_OTP, payload: email });
    });
  };
};

export const onChangeAddressOTP = () => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ADRESS_OTP, payload: {} });
  };
};

export const onChangePhoneStatus = () => {
  return (dispatch) => {
    dispatch({ type: CHANGE_PHONE_STATUS });
  };
}

export const onResetPassword = (oldPassword, newPassword) => {
  const { messages } = appIntl();
  return (dispatch) => {
    API.patch(RESET_PASSWORD_API, { oldPassword, newPassword }).then(() => {
      dispatch({ type: RESET_PASSWORD });
      dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] });
    });
  };
};

export const onChangePassword = ({ oldPassword, newPassword }) => {
  return (dispatch) => {
    const { messages } = appIntl();
    API.patch(CHAGE_PASSWORD_API, { oldPassword, newPassword }).then(() => {
      // dispatch({ type: SHOW_MESSAGE, payload: messages['common.successUpdate'] },)
    }
    ).catch(() => {
      // dispatch({ type: SHOW_MESSAGE, payload: messages['common.error'] },)
    });
  };
};

export const onLogout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });

    // API
    API.post(LOGOUT_API, null, { REQUEST_MUTED, REQUEST_IGNORE_401_ERROR });

    // Logout facebook
    logoutFacebook();

    // Navigate
    dispatch({ type: CLEAN_STATE });
    // const {loginScreen} = getState().auth;
    // if (loginScreen == 0) navigate(SIGN_IN_EMAIL_ROUTE);
    // else if (loginScreen == 1) navigate(SIGN_IN_OTP_ROUTE);
    // else navigate(defaultSignInUrl);
  };
};

export const onLogoutAndSetRedirect = (url) => {
  return (dispatch) => {
    dispatch({ type: SET_LOGIN_REDIRECT_TO, payload: url });
    dispatch(onLogout());
  };
};

export const onSetRedirectTo = (url) => {
  return (dispatch) => {
    dispatch({ type: SET_LOGIN_REDIRECT_TO, payload: url });
  };
};

export const onGetUserInfo = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_INFO_REQUEST });
    API.get(GET_USER_INFO_API, { REQUEST_MUTED })
      .then(({ data }) => {
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: { data } });
      })
      .catch((e) => {
        console.log("error",e);
        dispatch({ type: GET_USER_INFO_ERROR, payload: e.message });
      });
  };
};

export const onWipeUser = () => {
  return (dispatch) => {
    dispatch({ type: WIPE_USER });
  };
};
