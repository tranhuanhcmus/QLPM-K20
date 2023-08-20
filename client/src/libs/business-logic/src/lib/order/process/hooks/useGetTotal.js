import { useMemo } from "react";
import { useOrderContext } from "../context";

export const useGetTotal = () => {
  const { state } = useOrderContext();

  const memoizedOrder = useMemo(() => state.order, [state.order]);
  const subTotal = useMemo(() => {
    if (!memoizedOrder || !memoizedOrder.orderItem) return 0;

    return memoizedOrder.orderItem.reduce(
      (acc, curr) => acc + curr.item.price * curr.quantity,
      0
    );
  }, [memoizedOrder]);

  // const finalTotal = useMemo(() => {
  //   if (!memoizedOrder) return 0;

  //   return (
  //     subTotal +
  //     memoizedOrder.shipping +
  //     memoizedOrder.tax -
  //     memoizedOrder.coupon
  //   );
  // }, [subTotal, memoizedOrder]);

  return {
    subTotal: subTotal,
    // finalTotal: finalTotal >= 0 ? finalTotal : 0,
  };
};
