import { axios } from "@org/services";
import React from "react";
import { authConfig } from "../../../../configs";
import { useAccessToken } from "../hooks/useAccessToken";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { BroadcastProvider } from "./BroadcastProvider";
import { AuthContextProvider } from "./ContextProvider";

export const AuthProvider = ({ children }) => {
  const { getToken } = useAccessToken();
  const { onRefreshToken } = useRefreshToken();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Invalid credential" &&
        authConfig.isNeedRefreshToken
      ) {
        const token = getToken();
        if (token) {
          onRefreshToken(token)
            .then((res) => {
              if (!res.token) {
                return Promise.reject(error);
              }
              error.config.headers["Authorization"] = "Bearer " + res.token;
            })
            .finally(() => {
              return axios(error.config);
            });
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContextProvider>
      <BroadcastProvider>{children}</BroadcastProvider>
    </AuthContextProvider>
  );
};
