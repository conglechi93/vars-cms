import API from 'api/Request';
import {
  ADDRESS_LIST_API,
  CREATE_CATEGORY_API,
  DELETE_CATEGORY_API,
  GET_DETAIL_CATEGORY_API,
  GET_LIST_CATEGORY_API,
  UPDATE_CATEGORY_API,
} from 'shared/constants/ApiUrls';
import {
  GET_WARD_CATEGORY,
  GET_DISTRICT_CATEGORY,
  GET_PROVINCE_CATEGORY,
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_ERROR,
  GET_CATEGORY_DETAIL_REQUEST,
  GET_CATEGORY_DETAIL_SUCCESS,
  SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';
import {REQUEST_MUTED} from '@api/RequestEnum';
import {defaultPageOption} from 'shared/constants/AppConst';
import {appIntl} from '@crema/utility/helper/Utils';

export const onGetProvince = () => {
  return (dispatch, getState) => {
    if (getState().category.address.province.length) return;
    API.get(ADDRESS_LIST_API).then((value) => {
      dispatch({type: GET_PROVINCE_CATEGORY, payload: {value}});
    });
  };
};

export const onGetDistrict = (provinceCode) => {
  return (dispatch, getState) => {
    if (getState().category.address.district[provinceCode]?.length) return;
    API.get(ADDRESS_LIST_API, {params: {provinceCode}}).then((value) => {
      dispatch({type: GET_DISTRICT_CATEGORY, payload: {provinceCode, value}});
    });
  };
};

export const onGetWard = (districtCode) => {
  return (dispatch, getState) => {
    if (getState().category.address.ward[districtCode]?.length) return;
    API.get(ADDRESS_LIST_API, {params: {districtCode}}).then((value) => {
      dispatch({type: GET_WARD_CATEGORY, payload: {districtCode, value}});
    });
  };
};

export const onGetListCategory = (options = defaultPageOption) => {
  return (dispatch) => {
    dispatch({type: GET_LIST_CATEGORY_REQUEST});
    return API.post(GET_LIST_CATEGORY_API, options, {REQUEST_MUTED})
      .then((res) => {
        dispatch({
          type: GET_LIST_CATEGORY_SUCCESS,
          payload: {
            current: res.data,
            totalRow: res.totalRow,
            options,
          },
        });
      })
      .catch((error) => {
        dispatch({type: GET_LIST_CATEGORY_ERROR, payload: error.message});
      });
  };
};

export const onGetCategoryDetail = (objectId) => {
  return (dispatch) => {
    dispatch({type: GET_CATEGORY_DETAIL_REQUEST});
    if (!objectId)
      return dispatch({type: GET_CATEGORY_DETAIL_SUCCESS, payload: null});
    return API.post(GET_DETAIL_CATEGORY_API, {objectId}, {REQUEST_MUTED})
      .then((data) => {
        dispatch({type: GET_CATEGORY_DETAIL_SUCCESS, payload: data});
      })
      .catch((error) => {
        dispatch({type: GET_LIST_CATEGORY_ERROR, payload: error.message});
      });
  };
};

export const onCreateOrUpdateCategory = ({
  objectId,
  names,
  descriptions,
  group,
  code,
}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(objectId ? UPDATE_CATEGORY_API : CREATE_CATEGORY_API, {
      objectId,
      names,
      descriptions,
      group,
      code,
    }).then(() => {
      dispatch({type: GET_CATEGORY_DETAIL_SUCCESS, payload: null});
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
      dispatch(onGetListCategory(getState().category?.options));
    });
  };
};

export const onDeleteCategory = ({objectId}) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    return API.post(DELETE_CATEGORY_API, {
      objectId,
    }).then(() => {
      dispatch({
        type: SHOW_MESSAGE,
        payload: messages['common.successDelete'],
      });
      dispatch(onGetListCategory(getState().category?.options));
    });
  };
};
