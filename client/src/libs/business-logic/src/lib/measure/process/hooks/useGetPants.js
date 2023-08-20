// Import necessary modules and functions
import { useGetPantsMutation } from "../../fetching/mutation";
import { useMeasureContext } from "../context/measureContext";

export const useGetPants = () => {
  const { state, dispatch } = useMeasureContext();
  const getPantsMutation = useGetPantsMutation();

  const onGetPants = (paramObj) => {
    return new Promise((resolve, reject) => {
      const newPantsForm = {
        ...state.pants,
        ...paramObj,
      };
      dispatch({
        type: "SET_PANTS",
        payload: newPantsForm,
      });

      getPantsMutation
        .mutateAsync(newPantsForm)
        .then((data) => {
          dispatch({
            type: "SET_IMAGE",
            payload: data,
          });

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    onGetPants,
    isLoading: getPantsMutation.isLoading,
  };
};
