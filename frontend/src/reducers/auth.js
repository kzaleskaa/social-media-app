import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  PASSWORD_CONFIRMATION_SUCCESS,
  PASSWORD_CONFIRMATION_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
} from "../types/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case LOAD_USER_FAIL:
      return { ...state, user: payload };
    case LOAD_USER_SUCCESS:
      return { ...state, user: payload };
    case SIGNUP_SUCCESS:
      return { ...state, isAuthenticated: false };
    case LOGIN_FAIL:
    case LOGOUT:
    case SIGNUP_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_FAIL:
    case PASSWORD_CONFIRMATION_SUCCESS:
    case PASSWORD_CONFIRMATION_FAIL:
    case ACTIVATION_FAIL:
    case ACTIVATION_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;
