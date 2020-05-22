import { combineReducers } from "redux";
import userReducer from "./userReducers";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

export default rootReducer;
