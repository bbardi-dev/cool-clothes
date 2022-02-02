import { combineReducers, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import userReducer from "./userReducer";
import { ActionTypes, AppState } from "../types";
import cartReducer from "./cartReducer";
import shopReducer from "./shopReducer";

const combinedReducers = combineReducers<AppState>({
  user: userReducer,
  cart: cartReducer,
  shop: shopReducer,
});

const rootReducer: Reducer<AppState, ActionTypes> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state?.cart) nextState.cart = state.cart;
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default rootReducer;
