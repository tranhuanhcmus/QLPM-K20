export const checkoutReducer = (state, action) => {
  try {
    switch (action.type) {
      case "SET_TOKEN_ACTION":
        return {
          ...state,
          accessToken: action.payload,
        };

      default:
        return state;
    }
  } catch (error) {
    console.error("Error in checkoutReducer: ", error);
    return state;
  }
};
