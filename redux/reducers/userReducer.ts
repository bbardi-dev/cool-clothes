import { Reducer } from "redux";
import {
  ActionTypes,
  SET_CURRENT_USER,
  UPDATE_WISHLIST,
  UserState,
} from "../types";

const initialState: UserState = {
  currentUser: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state.currentUser, currentUser: action.payload };
    case UPDATE_WISHLIST:
      return {
        ...state,
        currentUser: { ...state.currentUser, wishlist: action.payload },
      };

    default:
      return state;
  }
};

export default userReducer;
