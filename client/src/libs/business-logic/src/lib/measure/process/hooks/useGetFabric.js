// Importing necessary modules and functions
import { useGetFabricQuery } from "../../fetching/query";

export const useGetFabric = () => {
  const { data } = useGetFabricQuery();
  return data;
};
