export const wishlistReducer = (state, action) => {
  try {
    switch (action.type) {
      case "SET_WISHLIST":
        return {
          ...state,
          wishlist: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error("Error in wishlistReducer: ", error);
    return state;
  }
};
