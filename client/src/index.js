import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";

/**
 * The state of entire application is stored in an object called a 'store'.
 * Instead of changing the state with setState(), an action is required to modify it.
 *
 * An action is simply a function that returns an object which describes
 * what happened to the state
 *
 * In order for the action and state to be tied together, a function called a reducer is required.
 * Reducers simply return the updated state of the app/component.
 *
 * We can then combine all of our reducers into a single reducer with combineReducers() which will
 * represent the state of our entire application
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
