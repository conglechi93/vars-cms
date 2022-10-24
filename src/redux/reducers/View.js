import {SET_VIEW_HEIGHT} from '../../shared/constants/ActionTypes';

const initialSettings = {
  viewHeight: 0,
};

const viewReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_VIEW_HEIGHT:
      return {
        ...state,
        viewHeight: action.payload,
      };

    default:
      return state;
  }
};

export default viewReducer;
