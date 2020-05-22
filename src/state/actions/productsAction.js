import axios from "axios";
import * as actionTypes from "../constants/actionConstants";
import { PRODUCT_SERVER } from "../../resource/util/misc";

export const getProductsData = (data) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${PRODUCT_SERVER}/articles?sortBy=${data}&order=desc&limit=4`
    );
    const resData = await response.data;
    if (data === "sold") {
      dispatch({ type: actionTypes.GET_PRODUCT_DATA, sell: resData });
      return {
        type: actionTypes.GET_PRODUCT_DATA,
        sell: resData,
      };
    } else {
      dispatch({ type: actionTypes.GET_PRODUCT_DATA, arrival: resData });
      return {
        type: actionTypes.GET_PRODUCT_DATA,
        arrival: resData,
      };
    }
  };
};

export const getBrands = () => {
  return async (dispatch) => {
    const response = await axios.get(`${PRODUCT_SERVER}/brands`);
    const resData = await response.data;
    dispatch({ type: actionTypes.GET_PRODUCT_BRANDS, payload: resData });
    return {
      type: actionTypes.GET_PRODUCT_BRANDS,
      payload: resData,
    };
  };
};
export const getWoods = () => {
  return async (dispatch) => {
    const response = await axios.get(`${PRODUCT_SERVER}/woods`);
    const resData = await response.data;
    dispatch({ type: actionTypes.GET_PRODUCT_WOODS, payload: resData });
    return {
      type: actionTypes.GET_PRODUCT_WOODS,
      payload: resData,
    };
  };
};

export const getShopProduct = (skip, limit, filters, previousState = []) => {
  return async (dispatch) => {
    try {
      const data = {
        limit: limit,
        skip: skip,
        filters: filters,
      };
      const response = await axios.post(`${PRODUCT_SERVER}/shop`, data);
      let serverArticles = await response.data.articles;
      let newState = previousState.concat(serverArticles);
      // console.log(newState);
      const resData = async () => {
        return {
          size: await response.data.size,
          articles: newState,
        };
      };
      dispatch({ type: actionTypes.GET_SHOP_PRODUCT, payload: resData() });
      return {
        type: actionTypes.GET_SHOP_PRODUCT,
        payload: await resData(),
      };
    } catch (err) {
      console.log(err);
    }
  };
};
