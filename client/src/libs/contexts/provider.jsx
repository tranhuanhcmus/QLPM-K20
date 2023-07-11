import { useReducer } from "react";
import { createAppContext } from ".";

export const AppProvider = ({
  children,
  initialState,
  reducer
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const AppContext = createAppContext();
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
