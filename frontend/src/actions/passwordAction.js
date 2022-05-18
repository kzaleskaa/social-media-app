import axios from "axios";
import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  PASSWORD_CONFIRMATION_SUCCESS,
  PASSWORD_CONFIRMATION_FAIL,
  GET_ERROR,
} from "../types/types";

const configuration = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const changePassword = (email) => async (dispatch) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/users/reset_password/`,
      JSON.stringify({ email }),
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
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND}/auth/users/reset_password_confirm/`,
        JSON.stringify({ uid, token, new_password, re_new_password }),
        configuration
      );

      dispatch({ type: PASSWORD_CONFIRMATION_SUCCESS });
    } catch (err) {
      const error = { msg: err.response.data, status: err.response.status };

      dispatch({ type: GET_ERROR, payload: error });
      dispatch({ type: PASSWORD_CONFIRMATION_FAIL });
    }
  };
