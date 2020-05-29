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

export const addBrand = (brand, existingBrands) => {
  return async (dispatch) => {
    const response = await axios.post(`${PRODUCT_SERVER}/brand`, brand, {
      withCredentials: true,
    });
    let brands = [...existingBrands, response.data.brand];
    const resData = async () => {
      return {
        success: await response.data.success,
        brands,
      };
    };
    dispatch({ type: actionTypes.ADD_PRODUCT_BRAND, payload: await resData() });
    return {
      type: actionTypes.ADD_PRODUCT_BRAND,
      payload: await resData(),
    };
  };
};

export const addWood = (wood, existingWoods) => {
  return async (dispatch) => {
    const response = await axios.post(`${PRODUCT_SERVER}/wood`, wood, {
      withCredentials: true,
    });
    let woods = [...existingWoods, response.data.wood];
    const resData = async () => {
      return {
        success: await response.data.success,
        woods,
      };
    };
    dispatch({ type: actionTypes.ADD_PRODUCT_WOOD, payload: await resData() });
    return {
      type: actionTypes.ADD_PRODUCT_WOOD,
      payload: await resData(),
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

export const addProduct = (dataToSubmit) => {
  return async (dispatch) => {
    const request = await axios.post(
      `${PRODUCT_SERVER}/article`,
      dataToSubmit,
      {
        withCredentials: true,
      }
    );
    const resData = await request.data;
    dispatch({ type: actionTypes.ADD_PRODUCT, payload: resData });
    return { type: actionTypes.ADD_PRODUCT, payload: resData };
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    const request = await axios.get(
      `${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`
    );
    const resData = await request.data[0];
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAIL,
      payload: resData,
    });
    return {
      type: actionTypes.GET_PRODUCT_DETAIL,
      payload: resData,
    };
  };
};

export const clearProductDetail = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_PRODUCT_DETAIL,
      payload: "",
    });
    return {
      type: actionTypes.CLEAR_PRODUCT_DETAIL,
      payload: "",
    };
  };
};
