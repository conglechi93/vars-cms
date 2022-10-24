import {
  DISPATCH_ERROR,
  DISPATCH_SUCESS,
  FETCH_ERROR,
  SSO_AUTH_CODE_ERROR,
  SSO_AUTH_CODE_REQUEST,
  SSO_AUTH_CODE_SUCCESS,
  TOGGLE_SSO_ERROR,
  TOGGLE_SSO_SUCCESS,
} from 'shared/constants/ActionTypes';
import {REQUEST_OTAC_API, VALIDATING_CLIENT} from 'shared/constants/ApiUrls';
import API from 'api/Request';
import {REQUEST_MUTED} from '@api/RequestEnum';

export const onReturnObj = (obj) => {
  return (dispatch) => {
    dispatch({type: DISPATCH_SUCESS, payload: obj});
  };
};

export const onReturnError = (msg) => {
  return (dispatch) => {
    dispatch({type: DISPATCH_ERROR, payload: msg});
  };
};

export const onEnableSSO = (settings) => {
  return (dispatch) => {
    const {appCode, clientId} = settings;
    API.post(VALIDATING_CLIENT, {appCode, clientId}, {REQUEST_MUTED})
      .then(() => {
        dispatch({type: TOGGLE_SSO_SUCCESS, payload: settings});
      })
      .catch((e) => {
        dispatch({type: TOGGLE_SSO_ERROR, payload: e.message});
      });
  };
};

export const onRequestAuthCode = () => {
  return (dispatch, getState) => {
    const settings = getState().sso?.settings || {};
    const {appCode, clientId} = settings;
    dispatch({type: SSO_AUTH_CODE_REQUEST});
    API.post(REQUEST_OTAC_API, {appCode, clientId}, {REQUEST_MUTED})
      .then((data) => {
        dispatch({type: SSO_AUTH_CODE_SUCCESS, payload: data});
      })
      .catch((e) => {
        dispatch({type: SSO_AUTH_CODE_ERROR, payload: e.message});
        dispatch({type: FETCH_ERROR, payload: e.message});
      });
  };
};
