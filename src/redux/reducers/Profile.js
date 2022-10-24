import {
    GET_PROFILE_DETAIL_REQUEST,
    GET_PROFILE_DETAIL_SUCCESS,
    GET_PROFILE_DETAIL_ERROR,
    UPDATE_PROFILE_DETAIL
  } from 'shared/constants/ActionTypes';

const initialState = {
    current: [],
    userInfo: null,
    loading: false,
    error: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_PROFILE_DETAIL_REQUEST:
        return {
        ...state,
        loading: true,
        error: null,
        };
    case GET_PROFILE_DETAIL_SUCCESS:
        return {
        ...state,
        userInfo: action.payload,
        loading: false,
        };
    case GET_PROFILE_DETAIL_ERROR:
        return {
        ...state,
        };
    case UPDATE_PROFILE_DETAIL:
        return {
        ...state,
        };
    default:
        return state;
    }
};

  export default profileReducer;
  


