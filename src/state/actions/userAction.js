import axios from "axios";
import * as actionTypes from "../constants/actionConstants";
import { USER_SERVER } from "../../resource/util/misc";
import { PRODUCT_SERVER } from "../../resource/util/misc";

export const authSuccess = (request) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: request,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const authLogOut = (request) => {
  localStorage.removeItem("login");
  return {
    type: actionTypes.AUTH_LOGOUT,
    payload: request,
  };
};

export const authUser = (request) => {
  return {
    type: actionTypes.AUTHORIZE_USER,
    payload: request,
  };
};

export const loginUser = (dataToSubmit) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit, {
        withCredentials: true,
      });
      const request = await response.data;
      if (request.loginSuccess) {
        dispatch(authSuccess(request));
        asyncLocalStorage.setItem("login", request.loginSuccess);
        return {
          type: actionTypes.AUTH_SUCCESS,
          payload: request,
        };
      }
    } catch (err) {
      dispatch(authFail(err));
    }
  };
};

export const registerUser = (dataToSubmit) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${USER_SERVER}/register`,
        dataToSubmit
      );
      const request = await response.data;
      return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: request,
      };
    } catch (err) {
      dispatch(authFail);
    }
  };
};

export const authorizeUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${USER_SERVER}/auth`, {
        withCredentials: true,
      });
      const request = await response.data;
      dispatch(authUser(request));
      return {
        type: actionTypes.AUTHORIZE_USER,
        payload: request,
      };
    } catch (err) {
      dispatch(authFail(err));
    }
  };
};

export const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

export const logoutUser = () => {
  return async (dispatch) => {
    const response = await axios.get(`${USER_SERVER}/logout`, {
      withCredentials: true,
    });
    const request = await response.data;
    dispatch(authLogOut(request));
    return {
      type: actionTypes.AUTH_LOGOUT,
      payload: request,
    };
  };
};

export const addToCart = (id) => {
  return async (dispatch) => {
    const request = await axios.post(
      `${USER_SERVER}/add_to_cart?productId=${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    const resData = await request.data;
    //console.log(resData);
    if (!resData.error) {
      dispatch({
        type: actionTypes.ADD_TO_CART_USER,
        payload: resData,
      });
      return {
        type: actionTypes.ADD_TO_CART_USER,
        payload: resData,
      };
    }
  };
};

export const getCartItems = (cartItems, userCart) => {
  return async (dispatch) => {
    const request = await axios.get(
      `${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`,
      { withCredentials: true }
    );
    const resData = request.data;
    if (resData) {
      userCart.forEach((element) => {
        resData.forEach((item, i) => {
          if (element.id === item._id) {
            resData[i].quantity = element.quantity;
          }
        });
      });
      // console.log(resData);
      dispatch({
        type: actionTypes.GET_CART_ITEMS,
        payload: resData,
      });
      return {
        type: actionTypes.GET_CART_ITEMS,
        payload: resData,
      };
    }
  };
};

export const removeCartItem = (cartItemId) => {
  return async (dispatch) => {
    const request = await axios.get(
      `${USER_SERVER}/removeFromCart?id=${cartItemId}`,
      {
        withCredentials: true,
      }
    );
    const resData = await request.data;
    if (resData) {
      resData.cart.forEach((element) => {
        resData.cartDetail.forEach((item, i) => {
          if (element.id === item._id) {
            resData.cartDetail[i].quantity = element.quantity;
          }
        });
      });
      dispatch({
        type: actionTypes.REMOVE_CART_ITEM,
        payload: resData,
      });
      return {
        type: actionTypes.REMOVE_CART_ITEM,
        payload: resData,
      };
    }
  };
};

export const SuccessfulPurchase = (data) => {
  return async (dispatch) => {
    console.log(data);
    const request = await axios.post(
      `${USER_SERVER}/successfulPurchase`,
      data,
      {
        withCredentials: true,
      }
    );
    const resData = await request.data;
    console.log(resData);
    if (resData.success) {
      dispatch({
        type: actionTypes.SUCCESSFUL_PURCHASE,
        payload: resData,
      });
      return {
        type: actionTypes.SUCCESSFUL_PURCHASE,
        payload: resData,
      };
    }
  };
};
