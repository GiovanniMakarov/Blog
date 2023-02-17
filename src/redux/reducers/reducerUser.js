/* eslint-disable default-param-last */
import actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  isAuthorized: false,
  isUserProcessing: false,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ACCOUNT:
      return {
        ...state,
        user: action.response,
      };

    case actionTypes.CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        userError: action.error,
      };

    case actionTypes.SUCCESS_LOGIN:
      return {
        ...state,
        user: action.response,
        isAuthorized: true,
      };

    case actionTypes.LOGOUT:
      console.log("logout");
      return {
        ...state,
        user: null,
        isAuthorized: false,
      };

    case actionTypes.SUCCESS_CHANGE:
      return {
        ...state,
        user: action.response,
      };

    case actionTypes.SET_USER_PROCESSING:
      return {
        ...state,
        isUserProcessing: action.value,
      };

    default:
      return state;
  }
};

export default reducerUser;
