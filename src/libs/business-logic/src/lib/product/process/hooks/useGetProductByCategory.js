// Importing necessary modules and functions
import { useGetProductByCategoryQuery } from "../../fetching/query";

export const useGetProductByCategory = ({ category }) => {
  const { data } = useGetProductByCategoryQuery({ category });
  return data;
};
