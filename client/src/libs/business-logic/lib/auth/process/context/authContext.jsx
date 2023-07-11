import React from "react";
import { useContext } from "react";

export const AuthContext = React.createContext({
  state: { token: null },
  dispatch: () => undefined
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
