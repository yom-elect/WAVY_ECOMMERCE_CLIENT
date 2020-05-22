import axios from "axios";
import * as actionTypes from "../constants/actionConstants";
import { USER_SERVER } from "../../resource/util/misc";

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
      dispatch(authSuccess(request));
      asyncLocalStorage.setItem("login", request.loginSuccess);
      return {
        type: actionTypes.AUTH_SUCCESS,
        payload: request,
      };
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
