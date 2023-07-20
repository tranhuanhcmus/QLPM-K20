// Defining the reducer for the authentication state
import { CONTEXT_ACTION } from "../../constants";

// This reducer handles actions to get and set the authentication token
export const authReducer = (
  state,
  action
) => {
  try {
    switch (action.type) {
      case CONTEXT_ACTION.GET_ACTION:
        // Returns the current state when the action is to get the token
        return state;
      case CONTEXT_ACTION.SET_ACTION:
        // Returns a new state with the new token when the action is to set the token
        return { 
          ...state,
          token: action.payload 
        };
      default:
        // Returns the current state for any other action
        return state;
    }
  } catch (error) {
    console.error("Error in authReducer: ", error);
    return state;
  }
};
