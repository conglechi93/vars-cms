import {
  DISPATCH_SUCESS,
  DISPATCH_ERROR,
  TOGGLE_SSO_SUCCESS,
  TOGGLE_SSO_ERROR,
  SSO_AUTH_CODE_REQUEST,
  SSO_AUTH_CODE_SUCCESS,
  SSO_AUTH_CODE_ERROR,
} from 'shared/constants/ActionTypes';

const initialState = {
  payload: null,
  error: null,
  enabled: false,
  settings: null,
  loadingCode: false,
  authCode: null,
  errorCode: null,
  errorToggle: null
};

const SSOReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPATCH_SUCESS:
      return {
        ...state,
        payload: action.payload,
      };
    case DISPATCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_SSO_SUCCESS:
      return {
        ...initialState,
        settings: action.payload,
        enabled: true,
      };
    case TOGGLE_SSO_ERROR:
      return {
        ...initialState,
        settings: null,
        enabled: false,
        errorToggle: action.payload
      };
    case SSO_AUTH_CODE_REQUEST:
      return {
        ...state,
        loadingCode: true,
        errorCode: null,
      };
    case SSO_AUTH_CODE_SUCCESS:
      return {
        ...state,
        loadingCode: false,
        authCode: action.payload,
      };
    case SSO_AUTH_CODE_ERROR:
      return {
        ...state,
        loadingCode: false,
        errorCode: action.payload,
      };
    default:
      return state;
  }
};
export default SSOReducer;
