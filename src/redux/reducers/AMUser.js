import {
  GET_LIST_USER_APP_ERROR,
  GET_LIST_USER_APP_REQUEST,
  GET_LIST_USER_APP_SUCCESS,
  GET_LIST_USER_ERROR,
  GET_LIST_USER_REQUEST,
  GET_LIST_USER_SUCCESS,
  GET_USER_DETAIL_ERROR,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
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
  loadingApp: false,
  userApp: [],
  errorApp: null,
};

const amUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LIST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload.current,
        totalRow: action.payload.totalRow,
        options: action.payload.options,
      };
    case GET_LIST_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        current: [],
      };

    case GET_USER_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
        errorDetail: null,
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case GET_USER_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        errorDetail: action.payload,
        detail: null,
      };
    case GET_LIST_USER_APP_REQUEST:
      return {
        ...state,
        loadingApp: true,
        userApp: [],
        errorApp: null,
      };
    case GET_LIST_USER_APP_SUCCESS:
      return {
        ...state,
        loadingApp: false,
        userApp: action.payload,
      };
    case GET_LIST_USER_APP_ERROR:
      return {
        ...state,
        loadingApp: false,
        errorApp: action.payload,
        userApp: [],
      };

    default:
      return state;
  }
};
export default amUserReducer;
