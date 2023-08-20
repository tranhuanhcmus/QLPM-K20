import { MeasureService } from "../../../../../services/src";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

const measureService = new MeasureService();

export const useGetJacketMutation = () => {
  return useMutation(measureService.getJacket, {
    retry: mutationConfig.RETRY,
  });
};
export const useGetPantsMutation = () => {
  return useMutation(measureService.getPants, {
    retry: mutationConfig.RETRY,
  });
};
export const useGetVestMutation = () => {
  return useMutation(measureService.getVest, {
    retry: mutationConfig.RETRY,
  });
};
