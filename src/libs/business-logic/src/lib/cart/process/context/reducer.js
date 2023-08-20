export const cartReducer = (state, action) => {
  try {
    switch (action.type) {
      case "SET_CART_ACTION":
        return {
          ...state,
          cart: action.payload,
        };
      case "SET_TOKEN_ACTION":
        return {
          ...state,
          accessToken: action.payload,
        };
      case "DELETE_ACTION":
        if (!state.cart || !action.payload.productId) return state;
        if (!action.payload.quantity) {
          // Delete item
          return {
            ...state,
            cart: state.cart.filter(
              (p) => p.item.id !== action.payload.productId
            ),
          };
        }
        // Else decrease quantity
        return {
          ...state,
          cart: state.cart.map((p) => {
            if (
              p.item.id === action.payload.productId &&
              action.payload.quantity
            ) {
              p.quantity -= action.payload.quantity;
            }
            return p;
          }),
        };

      default:
        return state;
    }
  } catch (error) {
    console.error("Error in cartReducer: ", error);
    return state;
  }
};
