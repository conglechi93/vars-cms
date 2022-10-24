import API from 'api/Request';
import {defaultPageOption} from 'shared/constants/AppConst';
import {REQUEST_MUTED} from '@api/RequestEnum';
import {
  FETCH_ERROR,
  GET_APPLICATION_DETAIL_ERROR,
  GET_APPLICATION_DETAIL_REQUEST,
  GET_APPLICATION_DETAIL_SUCCESS,
  GET_LIST_APPLICATION_ERROR,
  GET_LIST_APPLICATION_REQUEST,
  GET_LIST_APPLICATION_SUCCESS,
  GET_LIST_APPLICATION_USER_ERROR,
  GET_LIST_APPLICATION_USER_REQUEST,
  GET_LIST_APPLICATION_USER_SUCCESS,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';
import {appIntl} from '@crema/utility/helper/Utils';
import {
  ADD_CLIENT_API,
  CREATE_APPLICATION_API,
  DELETE_CLIENT_API,
  GET_DETAIL_APPLICATION_API,
  GET_LIST_APPLICATION_API,
  GET_LIST_USER_API,
  UPDATE_APPLICATION_API,
} from 'shared/constants/ApiUrls';

export const onGetListApplication = (options = defaultPageOption) => {
  return (dispatch) => {
    dispatch({type: GET_LIST_APPLICATION_REQUEST});
    return API.post(GET_LIST_APPLICATION_API, options, {REQUEST_MUTED})
      .then((res) => {
        dispatch({
          type: GET_LIST_APPLICATION_SUCCESS,
          payload: {
            applications: res.data,
            totalRow: res.totalRow,
            options,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_LIST_APPLICATION_ERROR, payload: error.message});
      });
  };
};

export const onGetApplicationDetail = (objectId) => {
  return (dispatch) => {
    dispatch({type: GET_APPLICATION_DETAIL_REQUEST});
    if (!objectId)
      return dispatch({type: GET_APPLICATION_DETAIL_SUCCESS, payload: null});
    return API.post(GET_DETAIL_APPLICATION_API, {objectId}, {REQUEST_MUTED})
      .then((res) => {
        dispatch({type: GET_APPLICATION_DETAIL_SUCCESS, payload: res});
      })
      .catch((error) => {
        dispatch({type: GET_APPLICATION_DETAIL_ERROR, payload: error.message});
      });
  };
};

export const onCreateOrUpdateApplication = ({
  objectId,
  adminUserId,
  name,
  code,
}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(
      objectId ? UPDATE_APPLICATION_API : CREATE_APPLICATION_API,
      {
        objectId,
        adminUserId,
        name,
        code,
      },
    ).then(() => {
      dispatch({type: GET_APPLICATION_DETAIL_SUCCESS, payload: null});
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
      dispatch(onGetListApplication(getState().adminApplication?.options));
    });
  };
};

export const onAddClient = ({appId, name}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(ADD_CLIENT_API, {
      appId,
      name,
    }).then(() => {
      dispatch({
        type: SHOW_MESSAGE,
        payload: messages['common.successCreate'],
      });
      dispatch(onGetListApplication(getState().adminApplication?.options));
    });
  };
};

export const onDeleteClient = ({objectId}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(DELETE_CLIENT_API, {
      objectId,
    }).then(() => {
      dispatch({
        type: SHOW_MESSAGE,
        payload: messages['common.successDelete'],
      });
      dispatch(onGetListApplication(getState().adminApplication?.options));
    });
  };
};

export const onGetAssignableUser = () => {
  return (dispatch) => {
    dispatch({type: GET_LIST_APPLICATION_USER_REQUEST});
    return API.post(GET_LIST_USER_API, null, {REQUEST_MUTED})
      .then((data) => {
        dispatch({
          type: GET_LIST_APPLICATION_USER_SUCCESS,
          payload: data || [],
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_APPLICATION_USER_ERROR,
          payload: error.message,
        });
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
