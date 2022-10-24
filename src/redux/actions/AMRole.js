import API from 'api/Request';
import {defaultPageOption} from 'shared/constants/AppConst';
import {REQUEST_MUTED} from '@api/RequestEnum';
import {
  GET_LIST_ROLE_PERMISSION_ERROR,
  GET_LIST_ROLE_PERMISSION_REQUEST,
  GET_LIST_ROLE_PERMISSION_SUCCESS,
  GET_LIST_ROLE_ERROR,
  GET_LIST_ROLE_REQUEST,
  GET_LIST_ROLE_SUCCESS,
  GET_ROLE_DETAIL_ERROR,
  GET_ROLE_DETAIL_REQUEST,
  GET_ROLE_DETAIL_SUCCESS,
  SHOW_MESSAGE,
  FETCH_ERROR,
} from 'shared/constants/ActionTypes';
import {appIntl} from '@crema/utility/helper/Utils';
import {
  CREATE_ROLE_API,
  GET_ASSIGNABLE_PERMISSION_API,
  GET_DETAIL_ROLE_API,
  GET_LIST_ROLE_API,
  UPDATE_ROLE_API,
} from 'shared/constants/ApiUrls';

export const onGetListRolePermission = () => {
  return (dispatch) => {
    dispatch({type: GET_LIST_ROLE_PERMISSION_REQUEST});
    return API.get(GET_ASSIGNABLE_PERMISSION_API, {REQUEST_MUTED})
      .then((data) => {
        dispatch({type: GET_LIST_ROLE_PERMISSION_SUCCESS, payload: data || []});
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_ROLE_PERMISSION_ERROR,
          payload: error.message,
        });
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetListRole = (options = defaultPageOption) => {
  return (dispatch) => {
    dispatch({type: GET_LIST_ROLE_REQUEST});
    return API.post(GET_LIST_ROLE_API, options, {REQUEST_MUTED})
      .then((res) => {
        dispatch({
          type: GET_LIST_ROLE_SUCCESS,
          payload: {
            roles: res.data,
            totalRow: res.totalRow,
            options,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_LIST_ROLE_ERROR, payload: error.message});
      });
  };
};

export const onGetAllRole = () => {
  return (dispatch) => {
    dispatch({type: GET_LIST_ROLE_REQUEST});
    return API.post(GET_LIST_ROLE_API, null, {REQUEST_MUTED})
      .then((data) => {
        dispatch({
          type: GET_LIST_ROLE_SUCCESS,
          payload: {
            roles: data,
            totalRow: (data || []).length,
            options: {},
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_LIST_ROLE_ERROR, payload: error.message});
      });
  };
};

export const onGetRoleDetail = (objectId) => {
  return (dispatch) => {
    dispatch({type: GET_ROLE_DETAIL_REQUEST});
    if (!objectId)
      return dispatch({type: GET_ROLE_DETAIL_SUCCESS, payload: null});
    return API.post(GET_DETAIL_ROLE_API, {objectId}, {REQUEST_MUTED})
      .then((res) => {
        dispatch({type: GET_ROLE_DETAIL_SUCCESS, payload: res});
      })
      .catch((error) => {
        dispatch({type: GET_ROLE_DETAIL_ERROR, payload: error.message});
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onCreateOrUpdateRole = ({
  objectId,
  name,
  code,
  permissionIds,
  description,
}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(objectId ? UPDATE_ROLE_API : CREATE_ROLE_API, {
      objectId,
      name,
      code,
      permissionIds,
      description,
    }).then(() => {
      dispatch({type: GET_ROLE_DETAIL_SUCCESS, payload: null});
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
      dispatch(onGetListRole(getState().amRole?.options));
    });
  };
};
