import { LOGOUT } from "../types/types";

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
