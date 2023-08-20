import { ProductService } from "../../../../../services/src";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

// Initialize
const productService = new ProductService();

export const useGetProductByCategoryQuery = ({ category }) => {
  return useQuery([QUERY_KEYS.GET_PRODUCT_BY_CATEGORY, category], () =>
    productService.getProductByCategory({ category })
  );
};
