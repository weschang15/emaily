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

/**
 * Action that fires a post request to our backend route for creating a survey, sending the survey,
 * and updating our current user's token count.
 *
 * * Handle the redirect to /surveys after the request to send survey has been successfully fired
 *
 * @param {obj} values contains our submitted SurveyForm values
 * @param {obj} history allow react router to redirect to another component after request has been made
 */
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/**
 * An action creator that sends the token returned from Stripe to our backend server and dispatch the action
 * only when the token has been sent to our backend route.
 *
 * Our auth reducer will automatically update our global auth state whenever this action is fired.
 */
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
