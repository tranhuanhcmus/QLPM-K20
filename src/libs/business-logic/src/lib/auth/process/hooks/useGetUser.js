// Importing necessary modules and functions
import { useGetUserQuery } from "../../fetching/query";
import { useAccessToken } from "./useAccessToken";

export const useGetUser = () => {
  const { getToken } = useAccessToken();
  const { data } = useGetUserQuery(getToken());
  return data;
};
