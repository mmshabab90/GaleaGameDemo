import { SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConstant";
import { APP_LOADED } from "../reducers/asyncReducer";
import firebase from "../../App/config/firebase";

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        // keep user at app initialization
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
