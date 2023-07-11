import { useContext } from "react";
import { createAppContext } from ".";

export const useAppContext = () => {
  const AppContext = createAppContext();
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw Error("Context Error: Provider not inside of Context");
  }

  return appContext;
};
