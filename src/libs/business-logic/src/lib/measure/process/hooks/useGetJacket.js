// Import necessary modules and functions
import { useGetJacketMutation } from "../../fetching/mutation";
import { useMeasureContext } from "../context/measureContext";

export const useGetJacket = () => {
  const { state, dispatch } = useMeasureContext();
  const getJacketMutation = useGetJacketMutation();

  const onGetJacket = (paramObj) => {
    return new Promise((resolve, reject) => {
      const newJacketForm = {
        ...state.jacket,
        ...paramObj,
      };
      dispatch({
        type: "SET_JACKET",
        payload: newJacketForm,
      });

      getJacketMutation
        .mutateAsync(newJacketForm)
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
    onGetJacket,
    isLoading: getJacketMutation.isLoading,
  };
};
