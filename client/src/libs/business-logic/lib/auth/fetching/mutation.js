import { AuthService, SocialService } from "@org/services";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_CONFIG } from "../constants.js";

// Initialize the AuthService
const authService = new AuthService();
const socialService = new SocialService();

/**
 * Use this mutation to login
 */
export const useLoginMutation = () => {
  return useMutation(authService.login, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Use this mutation to register
 */
export const useRegisterMutation = () => {
  return useMutation(authService.register, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Use this mutation to refresh token
 */
export const useRefreshTokenMutation = () => {
  return useMutation(authService.refreshToken, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Use this mutation to refresh token
 */
export const useUpdateAccountMutation = () => {
  return useMutation(socialService.updateAccount, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};
