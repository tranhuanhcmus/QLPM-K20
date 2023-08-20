// Import necessary modules and functions
import { useGetVestMutation } from "../../fetching/mutation";
import { useMeasureContext } from "../context/measureContext";

export const useGetVest = () => {
  const { state, dispatch } = useMeasureContext();
  const getVestMutation = useGetVestMutation();

  const onGetVest = (paramObj) => {
    return new Promise((resolve, reject) => {
      const newVestForm = {
        ...state.vest,
        ...paramObj,
      };
      dispatch({
        type: "SET_JACKET",
        payload: newVestForm,
      });

      getVestMutation
        .mutateAsync(newVestForm)
        .then((data) => {
          console.log(data);

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
    onGetVest,
    isLoading: getVestMutation.isLoading,
  };
};
