import React from "react";
import { useContext } from "react";

export const MeasureContext = React.createContext({
  state: {
    vest: null,
    pants: null,
    jacket: null,
    image: null,
  },
  dispatch: () => undefined,
});

export const useMeasureContext = () => {
  const context = useContext(MeasureContext);
  if (context === undefined) {
    throw new Error("useMeasureContext must be used within a MeasureProvider");
  }
  return context;
};
