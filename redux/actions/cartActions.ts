import { Product } from "../../utils/types";
import {
  ActionTypes,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  TOGGLE_CART,
  REMOVE_ITEM,
  CLEAR_ALL_ITEMS_FROM_CART,
} from "../types";

export const toggleCart = (): ActionTypes => ({
  type: TOGGLE_CART,
});

export const addItem = (item: Product): ActionTypes => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (item: Product): ActionTypes => ({
  type: REMOVE_ITEM,
  payload: item,
});
export const clearItemFromCart = (item: Product): ActionTypes => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item,
});
export const clearAllItemsFromCart = (): ActionTypes => ({
  type: CLEAR_ALL_ITEMS_FROM_CART,
});
