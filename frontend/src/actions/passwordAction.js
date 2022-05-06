import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  PASSWORD_CONFIRMATION_SUCCESS,
  PASSWORD_CONFIRMATION_FAIL,
  GET_ERROR,
} from "../types/types";

import axios from "axios";

export const changePassword = (email) => async (dispatch) => {
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/users/reset_password/`,
      body,
      configuration
    );

    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (err) {
    const error = { msg: err.response.data, status: err.response.status };

    dispatch({ type: GET_ERROR, payload: error });
    dispatch({ type: CHANGE_PASSWORD_FAIL });
  }
};

// finish reset password process
export const confirmChangePassword =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND}/auth/users/reset_password_confirm/`,
        body,
        configuration
      );

      dispatch({ type: PASSWORD_CONFIRMATION_SUCCESS });
    } catch (err) {
      const error = { msg: err.response.data, status: err.response.status };

      dispatch({ type: GET_ERROR, payload: error });
      dispatch({ type: PASSWORD_CONFIRMATION_FAIL });
    }
  };
