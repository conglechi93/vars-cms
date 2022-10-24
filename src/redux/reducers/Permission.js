import {
  GET_LIST_PERMISSION_REQUEST,
  GET_LIST_PERMISSION_SUCCESS,
  GET_LIST_PERMISSION_ERROR,
  GET_PERMISSION_DETAIL_REQUEST,
  GET_PERMISSION_DETAIL_SUCCESS,
  GET_PERMISSION_DETAIL_ERROR,
} from 'shared/constants/ActionTypes';

const initialState = {
  current: [],
  options: {},
  loading: false,
  error: null,
  totalRow: 1,
  detail: null,
  loadingDetail: false,
  errorDetail: null,
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LIST_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload.current,
        totalRow: action.payload.totalRow,
        options: action.payload.options,
      };
    case GET_LIST_PERMISSION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        current: [],
      };

    case GET_PERMISSION_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
        errorDetail: null,
      };
    case GET_PERMISSION_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case GET_PERMISSION_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        errorDetail: action.payload,
        detail: null,
      };

    default:
      return state;
  }
};
export default permissionReducer;
