import API from 'api/Request';
import {
  FETCH_ERROR,
  GET_LIST_USER_APP_ERROR,
  GET_LIST_USER_APP_REQUEST,
  GET_LIST_USER_APP_SUCCESS,
  GET_LIST_USER_ERROR,
  GET_LIST_USER_REQUEST,
  GET_LIST_USER_SUCCESS,
  GET_USER_DETAIL_ERROR,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';
import {defaultPageOption} from 'shared/constants/AppConst';
import {REQUEST_MUTED} from '@api/RequestEnum';
import {appIntl} from '@crema/utility/helper/Utils';
import {
  ASSIGN_ROLE_API,
  CREATE_USER_API,
  GET_DETAIL_USER_API,
  GET_LIST_USER_API,
  GET_USER_APP_API,
} from 'shared/constants/ApiUrls';

export const onGetListUser = (options = defaultPageOption) => {
  return (dispatch) => {
    dispatch({type: GET_LIST_USER_REQUEST});
    return API.post(GET_LIST_USER_API, options, {REQUEST_MUTED})
      .then((res) => {
        dispatch({
          type: GET_LIST_USER_SUCCESS,
          payload: {
            current: res.data,
            totalRow: res.totalRow,
            options,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_LIST_USER_ERROR, payload: error.message});
      });
  };
};

export const onInviteUser = (userInfo) => {
  const {messages} = appIntl();
  console.log(userInfo);
  return (dispatch, getState) => {
    return API.post(CREATE_USER_API, userInfo).then(() => {
      dispatch({type: SHOW_MESSAGE, payload: messages['common.sendCreate']});
      dispatch(onGetListUser(getState().amUser?.options));
    });
  };
};

export const onGetUserDetail = (objectId) => {
  return (dispatch) => {
    dispatch({type: GET_USER_DETAIL_REQUEST});
    if (!objectId)
      return dispatch({type: GET_USER_DETAIL_SUCCESS, payload: null});
    return API.post(GET_DETAIL_USER_API, {objectId}, {REQUEST_MUTED})
      .then((data) => {
        dispatch({type: GET_USER_DETAIL_SUCCESS, payload: data});
      })
      .catch((error) => {
        dispatch({type: GET_USER_DETAIL_ERROR, payload: error.message});
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onUpdateUserRole = ({userId, roleIds}) => {
  const {messages} = appIntl();
  return (dispatch) => {
    return API.post(ASSIGN_ROLE_API, {userId, roleIds}).then(() => {
      dispatch({type: SHOW_MESSAGE, payload: messages['common.successUpdate']});
    });
  };
};

export const onGetListUserApp = () => {
  return (dispatch) => {
    dispatch({type: GET_LIST_USER_APP_REQUEST});
    return API.get(GET_USER_APP_API, {REQUEST_MUTED})
      .then((data) => {
        dispatch({type: GET_LIST_USER_APP_SUCCESS, payload: data || []});
      })
      .catch((error) => {
        dispatch({type: GET_LIST_USER_APP_ERROR, payload: error.message});
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
