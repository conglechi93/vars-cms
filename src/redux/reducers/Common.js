import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SET_NAVIGATE_AFTER_INTERMEDIA,
  SET_RECALCULATE_LAYOUT_SCROLL,
  SHOW_MESSAGE,
  SUCCESS_RECALCULATE_LAYOUT_SCROLL,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  error: '',
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  displayMessage: '',
  layoutScrollRefresh: false,
  redirectTo: null,
};

const commonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {...state, error: '', displayMessage: '', loading: true};
    }
    case UPDATING_CONTENT: {
      return {...state, error: '', displayMessage: '', updatingContent: true};
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: '',
        displayMessage: '',
        loading: false,
        updatingContent: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: '',
        displayMessage: action.payload,
        loading: false,
        updatingContent: false,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        displayMessage: '',
        updatingContent: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: '',
        displayMessage: '',
        updatingContent: false,
      };
    }
    case TOGGLE_APP_DRAWER: {
      return {
        ...state,
        isAppDrawerOpen: !state.isAppDrawerOpen,
      };
    }
    case SET_RECALCULATE_LAYOUT_SCROLL: {
      return {
        ...state,
        layoutScrollRefresh: true,
      };
    }
    case SUCCESS_RECALCULATE_LAYOUT_SCROLL: {
      return {
        ...state,
        layoutScrollRefresh: false,
      };
    }
    case SET_NAVIGATE_AFTER_INTERMEDIA:
      return {
        ...state,
        redirectTo: action.payload,
      };
    default:
      return state;
  }
};
export default commonReducer;
