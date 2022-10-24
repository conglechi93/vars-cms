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
} from 'shared/constants/ActionTypes';

const initialState = {
  roles: [],
  loadingRole: false,
  errorRole: null,
  assignablePermissions: [],
  loadingPermission: false,
  errorPermission: null,
  detail: null,
  loadingDetail: false,
  errorDetail: null,
  options: {},
  totalRow: 1,
};

const amUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_ROLE_REQUEST:
      return {
        ...state,
        loadingRole: true,
        errorRole: null,
      };
    case GET_LIST_ROLE_SUCCESS:
      return {
        ...state,
        loadingRole: false,
        roles: action.payload.roles,
        totalRow: action.payload.totalRow,
        options: action.payload.options,
      };
    case GET_LIST_ROLE_ERROR:
      return {
        ...state,
        loadingRole: false,
        errorRole: action.payload,
        roles: [],
      };
    case GET_LIST_ROLE_PERMISSION_REQUEST:
      return {
        ...state,
        loadingPermission: true,
        assignablePermissions: [],
        errorPermission: null,
      };
    case GET_LIST_ROLE_PERMISSION_SUCCESS:
      return {
        ...state,
        loadingPermission: false,
        assignablePermissions: action.payload,
      };
    case GET_LIST_ROLE_PERMISSION_ERROR:
      return {
        ...state,
        loadingPermission: false,
        errorPermission: action.payload,
        assignablePermissions: [],
      };
    case GET_ROLE_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
        errorDetail: null,
      };
    case GET_ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case GET_ROLE_DETAIL_ERROR:
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
export default amUserReducer;
