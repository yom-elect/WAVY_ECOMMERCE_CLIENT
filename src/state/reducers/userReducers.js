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
    case actionTypes.ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          userData: {
            ...state.userData.userData,
            cart: action.payload,
          },
        },
      };
    case actionTypes.GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload,
      };
    case actionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          userData: {
            ...state.userData.userData,
            cart: action.payload.cart,
          },
        },
      };
    case actionTypes.SUCCESSFUL_PURCHASE:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          userData: {
            ...state.userData.userData,
            cart: action.payload.cart,
          },
        },
        cartDetail: action.payload.cartDetail,
      };
    case actionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        updateUser: action.payload,
      };
    case actionTypes.CLEAR_USER_DATA:
      return {
        ...state,
        updateUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
