import { User } from "@prisma/client";
import { HYDRATE } from "next-redux-wrapper";
import { Category, Product } from "../utils/types";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_WISHLIST = "UPDATE_WISHLIST";
export const TOGGLE_CART = "TOGGLE_CART";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_ITEM_FROM_CART = "CLEAR_ITEM_FROM_CART";
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

export type ActionTypes =
  | { type: typeof HYDRATE; payload: any }
  | { type: typeof SET_CURRENT_USER; payload: ReduxUser | null }
  | { type: typeof UPDATE_WISHLIST; payload: string[] }
  | { type: typeof TOGGLE_CART }
  | { type: typeof ADD_ITEM; payload: Product }
  | { type: typeof REMOVE_ITEM; payload: Product }
  | { type: typeof CLEAR_ITEM_FROM_CART; payload: Product }
  | { type: typeof UPDATE_PRODUCTS; payload: Product[] }
  | { type: typeof UPDATE_CATEGORIES; payload: Category[] };

export type ReduxUser = Partial<User>;

export interface UserState {
  currentUser: ReduxUser | null;
}
export interface ShopState {
  categories: Category[] | null;
  products: Product[] | null;
}
export interface CartState {
  hidden: boolean;
  cartItems: Product[];
}
export interface AppState {
  user: UserState;
  cart: CartState;
  shop: ShopState;
}
