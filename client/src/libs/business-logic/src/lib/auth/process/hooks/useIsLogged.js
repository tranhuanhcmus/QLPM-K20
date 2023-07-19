// Importing necessary libraries and services
import { useAuthContext } from "../context";
import React from 'react'

// True: User is logged in and has a valid token
// False: User is NOT logged in or has an invalid (or expired) token
// Hook to check if the user is logged in
export const useIsLogged = () => {
  const { state } = useAuthContext();
  return React.useMemo(() => Boolean(state.token), [state.token]);
};
