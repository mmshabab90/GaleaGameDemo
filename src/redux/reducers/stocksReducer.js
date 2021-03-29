import {
  CREATE_STOCK_DATA,
  DELETE_STOCK_DATA,
  FETCH_STOCK_DATA,
  UPDATE_STOCK_DATA,
} from "../constants/stocksConstants";

const initialState = {
  stocks: [],
};

export default function stocksReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_STOCK_DATA:
      return {
        ...state,
        stocks: payload,
      };

    case CREATE_STOCK_DATA:
      return {
        ...state,
        stocks: [...state.stocks, payload],
      };

    case UPDATE_STOCK_DATA:
      return {
        ...state,
        stocks: [...state.stocks.filter((s) => s.id !== payload.id), payload],
      };

    case DELETE_STOCK_DATA:
      return {
        ...state,
        stocks: [...state.stocks.filter((s) => s.id !== payload)],
      };

    default:
      return state;
  }
}
