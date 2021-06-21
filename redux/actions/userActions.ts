import { User } from "@prisma/client";
import { ActionTypes, SET_CURRENT_USER } from "../types";

export const setCurrentUser = (user: User | null): ActionTypes => ({
  type: SET_CURRENT_USER,
  payload: user,
});
