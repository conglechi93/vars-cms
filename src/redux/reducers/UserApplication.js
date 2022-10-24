import {
  GET_MANAGABLE_APPLICATION_ERROR,
  GET_MANAGABLE_APPLICATION_REQUEST,
  GET_MANAGABLE_APPLICATION_SUCCESS,
  SELECT_APP,
  SET_EXCLUSIVE_NAV_ID,
  SET_NAV_PARAM,
} from 'shared/constants/ActionTypes';

const initialState = {
  loadingApp: false,
  managableApplications: [],
  errorApp: null,
  selectedAppId: null,
  exclusiveNavId: [],
  navParam: {},
};

const userApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MANAGABLE_APPLICATION_REQUEST:
      return {
        ...state,
        loadingApp: true,
        errorApp: null,
      };
    case GET_MANAGABLE_APPLICATION_SUCCESS:
      return {
        ...state,
        loadingApp: false,
        managableApplications: action.payload,
      };
    case GET_MANAGABLE_APPLICATION_ERROR:
      return {
        ...state,
        loadingApp: false,
        errorApp: action.payload,
        managableApplications: [],
      };
    case SELECT_APP:
      return {
        ...state,
        selectedAppId: action.payload,
      };
    case SET_EXCLUSIVE_NAV_ID:
      return {
        ...state,
        exclusiveNavId: action.payload || [],
      };
    case SET_NAV_PARAM:
      return {
        ...state,
        navParam: action.payload || {},
      };
    default:
      return state;
  }
};
export default userApplicationReducer;
