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
    // if (state.count.count) nextState.count.count = state.count.count; // EXAMPLE: preserve count value on client side navigation
    if (state?.cart.cartItems) nextState.cart.cartItems = state.cart.cartItems;
    nextState.cart.hidden = state?.cart.hidden;
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default rootReducer;
