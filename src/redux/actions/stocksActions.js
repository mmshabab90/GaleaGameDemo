import {
  CREATE_STOCK_DATA,
  DELETE_STOCK_DATA,
  FETCH_STOCK_DATA,
  UPDATE_STOCK_DATA,
} from "../constants/stocksConstants";
import moment from "moment";

export function listenToStocks(stocks) {
  let data = [];
  stocks.forEach((e) => {
    data.push({
      ...e,
      date: moment(e.date).format("YYYY-DD-MM"),
      time: moment(e.date).format("HH:mm"),
    });
  });
  return {
    type: FETCH_STOCK_DATA,
    payload: data,
  };
}

export function createStockData(stock) {
  return {
    type: CREATE_STOCK_DATA,
    payload: stock,
  };
}

export function updateStockData(stock) {
  return {
    type: UPDATE_STOCK_DATA,
    payload: stock,
  };
}

export function deleteStockData(stockId) {
  return {
    type: DELETE_STOCK_DATA,
    payload: stockId,
  };
}
