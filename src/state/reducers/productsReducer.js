import * as actionTypes from "../constants/actionConstants";

const initialState = {
  bySell: [],
  byArrival: [],
  brands: [],
  woods: [],
  toShop: [],
  toShopSize: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DATA:
      return {
        ...state,
        bySell: action.sell ? action.sell : state.bySell,
        byArrival: action.arrival ? action.arrival : state.byArrival,
      };
    case actionTypes.GET_PRODUCT_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case actionTypes.GET_PRODUCT_WOODS:
      return {
        ...state,
        woods: action.payload,
      };
    case actionTypes.GET_SHOP_PRODUCT:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };
    default:
      return state;
  }
};

export default productReducer;
