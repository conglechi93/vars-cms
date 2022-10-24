import API from 'api/Request';
import {
  CREATE_PERMISSION_API,
  DELETE_PERMISSION_API,
  GET_DETAIL_PERMISSION_API,
  GET_LIST_PERMISSION_API,
  UPDATE_PERMISSION_API,
} from 'shared/constants/ApiUrls';
import {
  GET_LIST_PERMISSION_REQUEST,
  GET_LIST_PERMISSION_SUCCESS,
  GET_LIST_PERMISSION_ERROR,
  GET_PERMISSION_DETAIL_REQUEST,
  GET_PERMISSION_DETAIL_SUCCESS,
  SHOW_MESSAGE,
  FETCH_ERROR,
} from 'shared/constants/ActionTypes';
import {REQUEST_MUTED} from '@api/RequestEnum';
import {defaultPageOption} from 'shared/constants/AppConst';
import {appIntl} from '@crema/utility/helper/Utils';

export const onGetListPermission = (options = defaultPageOption) => {
  return (dispatch) => {
    dispatch({type: GET_LIST_PERMISSION_REQUEST});
    return API.post(GET_LIST_PERMISSION_API, options, {REQUEST_MUTED})
      .then((res) => {
        dispatch({
          type: GET_LIST_PERMISSION_SUCCESS,
          payload: {
            current: res.data,
            totalRow: res.totalRow,
            options,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_LIST_PERMISSION_ERROR, payload: error.message});
      });
  };
};

export const onGetPermissionDetail = (objectId) => {
  return (dispatch) => {
    dispatch({type: GET_PERMISSION_DETAIL_REQUEST});
    if (!objectId)
      return dispatch({type: GET_PERMISSION_DETAIL_SUCCESS, payload: null});
    return API.post(GET_DETAIL_PERMISSION_API, {objectId}, {REQUEST_MUTED})
      .then((data) => {
        dispatch({type: GET_PERMISSION_DETAIL_SUCCESS, payload: data});
      })
      .catch((error) => {
        dispatch({type: GET_LIST_PERMISSION_ERROR, payload: error.message});
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onCreateOrUpdatePermission = ({
  objectId,
  name,
  description,
  group,
  code,
}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(objectId ? UPDATE_PERMISSION_API : CREATE_PERMISSION_API, {
      objectId,
      name,
      description,
      group,
      code,
    }).then(() => {
      dispatch({type: GET_PERMISSION_DETAIL_SUCCESS, payload: null});
      if (objectId)
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['common.successUpdate'],
        });
      else
        dispatch({
          type: SHOW_MESSAGE,
          payload: messages['common.successCreate'],
        });
      dispatch(onGetListPermission(getState().permission?.options));
    });
  };
};

export const onDeletePermission = ({objectId}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(DELETE_PERMISSION_API, {
      objectId,
    }).then(() => {
      dispatch({
        type: SHOW_MESSAGE,
        payload: messages['common.successDelete'],
      });
      dispatch(onGetListPermission(getState().permission?.options));
    });
  };
};
