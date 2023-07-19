import { AuthService, SocialService } from "../../../../../services";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_CONFIG } from "../constants";

// Khởi tạo AuthService
const authService = new AuthService();
const socialService = new SocialService();

/**
 * Sử dụng mutation này để đăng nhập
 */
export const useLoginMutation = () => {
  return useMutation(authService.login, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Sử dụng mutation này để đăng ký
 */
export const useRegisterMutation = () => {
  return useMutation(authService.register, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Sử dụng mutation này để làm mới token
 */
export const useRefreshTokenMutation = () => {
  return useMutation(authService.refreshToken, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Sử dụng mutation này để cập nhật tài khoản google login trên máy chủ
 */
export const useUpdateAccountMutation = () => {
  return useMutation(socialService.updateAccount, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Sử dụng mutation này để lấy access token khi đăng nhập facebook
 */
export const useGetFBAccessTokenMutation = () => {
  return useMutation(socialService.getFBAccessToken, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};

/**
 * Sử dụng mutation này để lấy thông tin người dùng fb khi đăng nhập facebook
 */
export const useGetFBUserInforMutation = () => {
  return useMutation(socialService.getFBUserInfor, {
    retry: MUTATION_CONFIG.RETRY_TIMES
  });
};
