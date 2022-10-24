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

export const fetchStart = () => {
  return (dispatch) => dispatch({type: FETCH_START});
};

export const fetchSuccess = () => {
  return (dispatch) => dispatch({type: FETCH_SUCCESS});
};
export const updatingContent = () => {
  return (dispatch) => dispatch({type: UPDATING_CONTENT});
};

export const fetchError = (error) => {
  return (dispatch) => dispatch({type: FETCH_ERROR, payload: error});
};

export const showMessage = (message) => {
  return (dispatch) => dispatch({type: SHOW_MESSAGE, payload: message});
};
export const onToggleAppDrawer = () => {
  return (dispatch) => dispatch({type: TOGGLE_APP_DRAWER});
};

export const hideMessage = () => {
  return (dispatch) => dispatch({type: HIDE_MESSAGE});
};

export const onRefreshLayoutScroll = () => {
  return (dispatch) => dispatch({type: SET_RECALCULATE_LAYOUT_SCROLL});
};

export const onRefreshedLayoutScroll = () => {
  return (dispatch) => dispatch({type: SUCCESS_RECALCULATE_LAYOUT_SCROLL});
};

export const onSetRedirectAfterIntermedia = (path) => {
  return (dispatch) =>
    dispatch({type: SET_NAVIGATE_AFTER_INTERMEDIA, payload: path});
};
