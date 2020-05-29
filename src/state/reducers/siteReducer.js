import * as actionTypes from "../constants/actionConstants";

const initialState = {};

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload,
      };
    case actionTypes.UPDATE_SITE_DATA:
      return {
        ...state,
        siteData: action.payload.siteInfo,
      };
    default:
      return state;
  }
};

export default siteReducer;
