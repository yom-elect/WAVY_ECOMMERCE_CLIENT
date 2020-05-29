import axios from "axios";
import * as actionTypes from "../constants/actionConstants";
import { SITE_SERVER } from "../../resource/util/misc";

export const getSiteInfo = () => {
  return async (dispatch) => {
    const request = await axios.get(`${SITE_SERVER}/site_info`);
    const resData = await request.data;

    if (resData) {
      dispatch({
        type: actionTypes.GET_SITE_DATA,
        payload: resData,
      });
      return {
        type: actionTypes.GET_SITE_DATA,
        payload: resData,
      };
    }
  };
};

export const updateSiteInfo = (data) => {
  return async (dispatch) => {
    const request = await axios.post(`${SITE_SERVER}/site_info`, data, {
      withCredentials: true,
    });
    const resData = await request.data;
    console.log(resData);
    if (resData.success) {
      dispatch({
        type: actionTypes.UPDATE_SITE_DATA,
        payload: resData,
      });
      return {
        type: actionTypes.UPDATE_SITE_DATA,
        payload: resData,
      };
    }
  };
};
