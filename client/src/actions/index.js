import axios from "axios";
import { FETCH_USER } from "./types";

/**
 * An action creator that uses ReduxThunk in order to manually dispatch the action only when
 * the current user api request has been made.
 */
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};
