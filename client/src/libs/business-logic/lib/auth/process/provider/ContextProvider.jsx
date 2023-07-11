// Importing necessary libraries and modules
import React, { useReducer } from "react";
import { AuthContext } from "../context/authContext";
import { authReducer } from "../context/reducer";

// Defining the AuthProvider component's props
export const AuthProvider = ({ children }) => {
  // Using the reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, { token: null });

  // Returning the context provider with the current state and dispatch function
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
