import { SocialService } from "@org/services";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

// Initialize 
const socialService = new SocialService();

export const useValidateQuery = (token) => {
    return useQuery(
        [QUERY_KEYS.VALIDATE_TOKEN],
        () => socialService.validateToken(token),
    );
};