// Import necessary modules and functions
import { useUpdateUserDetailMutation } from "../../fetching/mutation";
import { useUserContext } from "../context";

export const useUpdateUserDetail = () => {
  const { state, dispatch } = useUserContext();
  const updateUserDetailMutation = useUpdateUserDetailMutation();

  const onUpdateUserDetail = ({ userDetail }) => {
    return new Promise((resolve, reject) => {
      const accessToken = state.accessToken;
      if (accessToken) {
        updateUserDetailMutation
          .mutateAsync({
            accessToken,
            userDetail,
          })
          .then((res) => {
            dispatch({
              type: "SET_USER_DETAIL",
              payload: userDetail,
            });
            resolve(res.message);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error("Access Token is not valid"));
      }
    });
  };

  return {
    onUpdateUserDetail,
    isLoading: updateUserDetailMutation.isLoading,
  };
};
