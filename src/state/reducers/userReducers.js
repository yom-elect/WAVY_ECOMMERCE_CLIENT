import * as actionTypes from "../constants/actionConstants";

const initialState = {
  loginSuccess: false,
  registerSuccess: {},
  userData: {},
  logoutInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: action.payload,
      };
    case actionTypes.AUTHORIZE_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        logoutInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
