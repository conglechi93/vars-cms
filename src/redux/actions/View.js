import {SET_VIEW_HEIGHT} from '../../shared/constants/ActionTypes';

export const setViewHeight = (height) => {
  return (dispatch) => dispatch({type: SET_VIEW_HEIGHT, payload: height});
};
