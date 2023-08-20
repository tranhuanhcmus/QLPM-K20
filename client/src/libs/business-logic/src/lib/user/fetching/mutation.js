import { UserService } from "../../../../../services/src";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

const userService = new UserService();

export const useGetUserDetailMutation = () => {
  return useMutation(userService.getUserDetail, {
    retry: mutationConfig.RETRY,
  });
};
export const useUpdateUserDetailMutation = () => {
  return useMutation(userService.updateUserDetail, {
    retry: mutationConfig.RETRY,
  });
};
