import React from "react";
import styles from "./styles.module.scss";
// import { Images } from "../../../components/common/Cart/image";
import { useGetTotal } from "../../../libs/business-logic/src/lib/order/process/hooks/useGetTotal";
import { convertNumberToCurrency } from "../../../utils/helpers/MoneyConverter";
import { useGetOrder } from "../../../libs/business-logic/src/lib/order/process/hooks/useGetOrder";

// const orderItems = [
//   {
//     productId: 1,
//     price: "110.00",
//     name: "Original Vest 1",
//     number: 2,
//     image: Images.item,
//   },
//   {
//     productId: 2,
//     price: "120.00",
//     name: "Original Vest 2",
//     number: 5,
//     image: Images.item,
//   },
// ];

const PaymentProducts = () => {
  const { subTotal } = useGetTotal();
  const order = useGetOrder();

  return (
    <>
      <div className={styles.heading}>Products </div>

      <div className={styles.products}>
        {order &&
          Array.isArray(order.orderItem) &&
          order.orderItem.map((itemDetail) => (
            <div key={itemDetail.item.id} className={styles.product}>
              <img src={itemDetail.item.image} alt="product" />
              <div className={styles.product__info}>
                <span className={styles.product__name}>
                  {itemDetail.item.name} ( x{itemDetail.quantity} )
                </span>
                <span className={styles.product__price}>
                  Price: {convertNumberToCurrency("usd", itemDetail.item.price)}
                </span>
                <p className={styles.product__note}>
                  Fabric type: {itemDetail.item.fabricName}
                </p>
                <p className={styles.product__note}>
                  Color: {itemDetail.item.color}
                </p>
                <p className={styles.product__note}>
                  Description: {itemDetail.item.description}
                </p>
              </div>
            </div>
          ))}
      </div>

      <hr />
      <div className={styles.total}>
        <div>
          <span className={styles.label}>Total:</span>
          <span className={styles.value}>
            {convertNumberToCurrency("usd", subTotal)}
          </span>
        </div>
      </div>
    </>
  );
};

export default PaymentProducts;
