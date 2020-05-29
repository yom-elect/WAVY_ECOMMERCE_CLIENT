import { combineReducers } from "redux";
import userReducer from "./userReducers";
import productsReducer from "./productsReducer";
import siteReducer from "./siteReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  site: siteReducer,
});

export default rootReducer;
