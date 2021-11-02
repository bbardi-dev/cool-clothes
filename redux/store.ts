import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

import rootReducer from "./reducers/rootReducer";

const middleware = [
  thunk,
  nextReduxCookieMiddleware({
    subtrees: ["cart"],
  }),
];
const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const makeStore = wrapMakeStore(() =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))
);

export const wrapper = createWrapper(makeStore);
