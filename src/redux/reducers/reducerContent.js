/* eslint-disable default-param-last */
import actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  page: null,
  loading: false,
  error: false,
};

const reducerContent = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.SUCCESS_LOADING:
      return {
        ...state,
        data: action.data,
      };

    case actionTypes.ERROR_LOADING:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};

export default reducerContent;
