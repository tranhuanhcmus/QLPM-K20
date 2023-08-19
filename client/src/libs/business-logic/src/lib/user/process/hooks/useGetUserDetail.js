// Import necessary modules and functions
import { useGetUserDetailMutation } from "../../fetching/mutation";
import { useUserContext } from "../context";

export const useGetUserDetail = () => {
  const { state, dispatch } = useUserContext();
  const getUserDetailMutation = useGetUserDetailMutation();

  const onGetUserDetail = (defaultToken) => {
    return new Promise((resolve, reject) => {
      const accessToken = defaultToken ? defaultToken : state.accessToken;
      if (accessToken) {
        getUserDetailMutation
          .mutateAsync({
            accessToken,
          })
          .then((data) => {
            dispatch({
              type: "SET_USER_DETAIL",
              payload: data,
            });
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve(null);
      }
    });
  };

  return {
    onGetUserDetail,
    isLoading: getUserDetailMutation.isLoading,
  };
};
