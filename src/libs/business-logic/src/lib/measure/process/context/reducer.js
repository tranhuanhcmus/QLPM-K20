export const measureReducer = (state, action) => {
  try {
    switch (action.type) {
      case "SET_JACKET":
        return {
          ...state,
          jacket: action.payload,
        };
      case "SET_PANTS":
        return {
          ...state,
          pants: action.payload,
        };
      case "SET_VEST":
        return {
          ...state,
          vest: action.payload,
        };
      case "SET_IMAGE":
        return {
          ...state,
          image: action.payload,
        };

      default:
        return state;
    }
  } catch (error) {
    console.error("Error in measureReducer: ", error);
    return state;
  }
};
