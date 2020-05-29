import * as actionTypes from "../constants/actionConstants";

const initialState = {
  bySell: [],
  byArrival: [],
  brands: [],
  woods: [],
  toShop: [],
  toShopSize: null,
  adminProduct: {},
  prodDetail: {},
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
    case actionTypes.ADD_PRODUCT_BRAND:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands,
      };
    case actionTypes.ADD_PRODUCT_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods,
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
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        adminProduct: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload,
      };
    case actionTypes.CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
