import { ActionTypes, SET_CURRENT_USER, UserState } from "../types";

const initialState: UserState = {
  currentUser: null,
};

const userReducer = (state: UserState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};

export default userReducer;
