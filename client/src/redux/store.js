import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReudcer from "./reducers";

const userFromLocal = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  auth: {
    user: userFromLocal,
  },
};
const middleware = [thunk];

const store = createStore(
  rootReudcer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
