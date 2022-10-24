import {
  GET_WARD_CATEGORY,
  GET_DISTRICT_CATEGORY,
  GET_PROVINCE_CATEGORY,
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_ERROR,
  GET_CATEGORY_DETAIL_REQUEST,
  GET_CATEGORY_DETAIL_SUCCESS,
  GET_CATEGORY_DETAIL_ERROR,
} from 'shared/constants/ActionTypes';

const initialState = {
  address: {
    province: [],
    district: {},
    ward: {},
  },
  current: [],
  options: {},
  loading: false,
  error: null,
  totalRow: 1,
  detail: null,
  loadingDetail: false,
  errorDetail: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVINCE_CATEGORY:
      return {
        ...state,
        address: {
          ...state.address,
          province: [...action.payload.value],
        },
      };
    case GET_DISTRICT_CATEGORY:
      return {
        ...state,
        address: {
          ...state.address,
          district: {
            ...state.address.district,
            [action.payload.provinceCode]: action.payload.value || [],
          },
        },
      };
    case GET_WARD_CATEGORY:
      return {
        ...state,
        address: {
          ...state.address,
          ward: {
            ...state.address.ward,
            [action.payload.districtCode]: action.payload.value || [],
          },
        },
      };

    case GET_LIST_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload.current,
        totalRow: action.payload.totalRow,
        options: action.payload.options,
      };
    case GET_LIST_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_CATEGORY_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
        error: null,
      };
    case GET_CATEGORY_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case GET_CATEGORY_DETAIL_ERROR:
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
export default categoryReducer;
