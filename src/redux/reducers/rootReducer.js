import { combineReducers } from "redux";
import asyncReducer from "./asyncReducer";
import authReducer from "./authReducer";
import stocksReducer from "./stocksReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  test: testReducer,
  async: asyncReducer,
  auth: authReducer,
  stocks: stocksReducer,
});

export default rootReducer;
