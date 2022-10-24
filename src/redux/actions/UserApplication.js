import API, {apiRequestConfig} from 'api/Request';
import {
  FETCH_ERROR,
  GET_MANAGABLE_APPLICATION_ERROR,
  GET_MANAGABLE_APPLICATION_REQUEST,
  GET_MANAGABLE_APPLICATION_SUCCESS,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  SELECT_APP,
  SET_EXCLUSIVE_NAV_ID,
  SET_NAV_PARAM,
} from 'shared/constants/ActionTypes';
import {
  GET_MANAGABLE_APPLICATION_API,
  GET_USER_INFO_API,
} from 'shared/constants/ApiUrls';
import {REQUEST_MUTED} from '@api/RequestEnum';
import omit from 'lodash/omit';
import {adminRole} from 'shared/constants/AppConst';

export const onGetManagableApplication = () => {
  return (dispatch) => {
    dispatch({type: GET_MANAGABLE_APPLICATION_REQUEST});
    return API.get(GET_MANAGABLE_APPLICATION_API, {REQUEST_MUTED})
      .then((data) => {
        dispatch({
          type: GET_MANAGABLE_APPLICATION_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MANAGABLE_APPLICATION_ERROR,
          payload: error.message,
        });
      });
  };
};

export const onSelectApp = (appId) => {
  return (dispatch) => {
    dispatch({type: SELECT_APP, payload: appId});
    if (appId) {
      apiRequestConfig.headers = {
        ...apiRequestConfig.headers,
        ...{'ID-APP': appId},
      };
      dispatch({type: GET_USER_INFO_REQUEST});
      API.get(GET_USER_INFO_API, {REQUEST_MUTED})
        .then((userInfo) => {
          dispatch({type: GET_USER_INFO_SUCCESS, payload: {userInfo}});
          const permissions = userInfo?.permissions || [];
          if (!permissions.includes(adminRole)) {
            dispatch({
              type: SET_EXCLUSIVE_NAV_ID,
              payload: ['applicationManagement'],
            });
          } else {
            dispatch({type: SET_EXCLUSIVE_NAV_ID, payload: []});
          }
          dispatch({type: SET_NAV_PARAM, payload: {appId}});
        })
        .catch((e) => {
          dispatch({type: GET_USER_INFO_ERROR, payload: e.message});
          dispatch({type: FETCH_ERROR, payload: e.message});
        });
    } else
      apiRequestConfig.headers = omit(apiRequestConfig.headers, ['ID-APP']);
  };
};
