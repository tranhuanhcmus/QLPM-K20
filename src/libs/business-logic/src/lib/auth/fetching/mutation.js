import { AuthService, SocialService } from "../../../../../services/src";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

// Initialize the AuthService
const authService = new AuthService();
const socialService = new SocialService();

/**
 * Use this mutation to login
 */
export const useLoginMutation = () => {
  return useMutation(authService.login, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to register
 */
export const useRegisterMutation = () => {
  return useMutation(authService.register, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to refresh token
 */
export const useRefreshTokenMutation = () => {
  return useMutation(authService.refreshToken, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to google login update account on server
 */
export const useUpdateAccountMutation = () => {
  return useMutation(socialService.updateAccount, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to facebook login get access token
 */
export const useGetFBAccessTokenMutation = () => {
  return useMutation(socialService.getFBAccessToken, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to facebook login get fb user infor
 */
export const useGetFBUserInforMutation = () => {
  return useMutation(socialService.getFBUserInfor, {
    retry: mutationConfig.RETRY,
  });
};
