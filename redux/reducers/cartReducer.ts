import {
  ActionTypes,
  ADD_ITEM,
  CartState,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
  TOGGLE_CART,
  CLEAR_ALL_ITEMS_FROM_CART,
} from "../types";
import { addItemToCart, removeItem } from "../utils/cartUtils";

const initialState: CartState = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state: CartState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case TOGGLE_CART:
      return { ...state, hidden: !state.hidden };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItem(state.cartItems, action.payload),
      };
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case CLEAR_ALL_ITEMS_FROM_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
