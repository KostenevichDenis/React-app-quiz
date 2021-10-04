import axios from "axios";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function logout() {

    /* console.log("logout pressed"); */
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
      type: AUTH_LOGOUT,
    
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem("token")
    /* console.log('token: ', token) */
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      /* console.log('expirationDate: ', expirationDate) */
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
  

export function autoLogout(expiresIn) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
}

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      const response = isLogin
        ? await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqc1HF6YVaxiaOgV81BQCQYr07QOhq7ho",
            authData
          )
        : await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqc1HF6YVaxiaOgV81BQCQYr07QOhq7ho",
            authData
          );
      const data = response.data;
      /* console.log(data); */

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000
      );

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {
      console.log(e);
    }
  };
}
