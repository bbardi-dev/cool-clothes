import {
  ActionTypes,
  ShopState,
  UPDATE_CATEGORIES,
  UPDATE_PRODUCTS,
} from "../types";

const INITIAL_STATE: ShopState = {
  categories: null,
  products: null,
};

const shopReducer = (state = INITIAL_STATE, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
