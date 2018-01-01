import { FETCH_USER } from "../actions/types";

// Produce updated state for auth object
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
