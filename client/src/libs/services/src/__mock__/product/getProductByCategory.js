import { axiosMockAdapterInstance } from "../../config/axios";
import { ProductService } from "../../lib";
import productRawData from "../data/products.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new ProductService().getProductByCategoryUrl)
  .reply((config) => {
    const category = config.params.category;
    const result = productRawData.filter(
      (p) => p.type.toLowerCase() === category.toLowerCase()
    );
    return [200, result];
  });
