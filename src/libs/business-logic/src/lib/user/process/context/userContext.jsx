import React from "react";
import { useContext } from "react";

export const UserContext = React.createContext({
  state: {
    userDetail: null,
    accessToken: null,
  },
  dispatch: () => undefined,
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
