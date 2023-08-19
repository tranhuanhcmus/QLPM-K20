import { AuthService, SocialService } from "../../../../../services/src";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

// Initialize
const socialService = new SocialService();
const authService = new AuthService();

export const useValidateQuery = (token) => {
  return useQuery([QUERY_KEYS.VALIDATE_TOKEN], () =>
    socialService.validateToken(token)
  );
};
export const useGetUserQuery = (token) => {
  return useQuery([QUERY_KEYS.GET_USER, token], () =>
    authService.getUser(token)
  );
};
