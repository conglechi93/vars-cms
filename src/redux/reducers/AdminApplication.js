import {
  GET_APPLICATION_DETAIL_ERROR,
  GET_APPLICATION_DETAIL_REQUEST,
  GET_APPLICATION_DETAIL_SUCCESS,
  GET_LIST_APPLICATION_ERROR,
  GET_LIST_APPLICATION_REQUEST,
  GET_LIST_APPLICATION_SUCCESS,
  GET_LIST_APPLICATION_USER_ERROR,
  GET_LIST_APPLICATION_USER_REQUEST,
  GET_LIST_APPLICATION_USER_SUCCESS,
} from 'shared/constants/ActionTypes';

const initialState = {
  applications: [],
  loadingList: false,
  errorList: null,
  detail: null,
  loadingDetail: false,
  errorDetail: null,
  options: {},
  totalRow: 1,
  assignableUser: [],
  loadingUser: false,
  errorUser: null,
};

const adminApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_APPLICATION_REQUEST:
      return {
        ...state,
        loadingList: true,
        errorList: null,
      };
    case GET_LIST_APPLICATION_SUCCESS:
      return {
        ...state,
        loadingList: false,
        applications: action.payload.applications,
        totalRow: action.payload.totalRow,
        options: action.payload.options,
      };
    case GET_LIST_APPLICATION_ERROR:
      return {
        ...state,
        loadingList: false,
        errorList: action.payload,
        applications: [],
      };
    case GET_APPLICATION_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
        errorDetail: null,
      };
    case GET_APPLICATION_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case GET_APPLICATION_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        errorDetail: action.payload,
        detail: null,
      };
    case GET_LIST_APPLICATION_USER_REQUEST:
      return {
        ...state,
        loadingUser: true,
        assignableUser: [],
        errorUser: null,
      };
    case GET_LIST_APPLICATION_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        assignableUser: action.payload,
      };
    case GET_LIST_APPLICATION_USER_ERROR:
      return {
        ...state,
        loadingUser: false,
        errorUser: action.payload,
        assignableUser: [],
      };
    default:
      return state;
  }
};
export default adminApplicationReducer;
