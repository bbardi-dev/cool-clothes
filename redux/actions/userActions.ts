import { User } from "@prisma/client";
import { ActionTypes, SET_CURRENT_USER, UPDATE_WISHLIST } from "../types";

export const setCurrentUser = (user: User | null): ActionTypes => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const updateWishlist = (wishlist: string[]): ActionTypes => ({
  type: UPDATE_WISHLIST,
  payload: wishlist,
});
