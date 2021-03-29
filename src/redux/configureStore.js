import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { verifyAuth } from "./actions/authAction";
import rootReducer from "./reducers/rootReducer";

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  // Verify and persist login state
  store.dispatch(verifyAuth());
  return store;
}
