import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GET_ERROR,
} from "../types/types";

const configuration = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signUpNewUser =
  (first_name, last_name, email, nickname, password, re_password) =>
  async (dispatch) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      nickname,
      email,
      password,
      re_password,
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/auth/users/`,
        body,
        configuration
      );

      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (err) {
      const error = {
        msg: err.response.data,
        status: err.response.status,
      };

      dispatch({ type: GET_ERROR, payload: error });
      dispatch({ type: SIGNUP_FAIL });
    }
  };

export const verifyNewUser = (uid, token) => async (dispatch) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/users/activation/`,
      JSON.stringify({ uid, token }),
      configuration
    );

    dispatch({ type: ACTIVATION_SUCCESS });
  } catch (err) {
    dispatch({ type: ACTIVATION_FAIL });
  }
};
