import { MeasureService } from "../../../../../services/src";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

// Initialize
const measureService = new MeasureService();
export const useGetFabricQuery = () => {
  return useQuery([QUERY_KEYS.GET_FABRIC], () => measureService.getFabric());
};
