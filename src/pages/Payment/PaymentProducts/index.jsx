import React from "react";
import styles from "./styles.module.scss";
// import { Images } from "../../../components/common/Cart/image";
import { useGetTotal } from "../../../libs/business-logic/src/lib/order/process/hooks/useGetTotal";
import { convertNumberToCurrency } from "../../../utils/helpers/MoneyConverter";
import { useGetOrder } from "../../../libs/business-logic/src/lib/order/process/hooks/useGetOrder";
import Heading1 from "../../../components/common/text/Heading1/Heading";

const PaymentProducts = () => {
  const { subTotal } = useGetTotal();
  const order = useGetOrder();
  const method = window.localStorage.getItem("METHOD");
  const measureData = JSON.parse(
    window.localStorage.getItem("MEASURE_DATA") || "{}"
  );
  window.localStorage.removeItem("MEASURE_DATA");
  window.localStorage.removeItem("METHOD");
  if (method && method === "measure") {
    return (
      <>
        <Heading1>Products </Heading1>

        <div className={styles.products}>
          {measureData.image && (
            <div className={styles.product}>
              <img src={measureData.image.front} alt="product" />
              <div className={styles.product__info}>
                {/* <span className={styles.product__name}>
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
              </p> */}
              </div>
            </div>
          )}
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
  } else {
    return (
      <>
        <Heading1>Products </Heading1>

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
                    Price:{" "}
                    {convertNumberToCurrency("usd", itemDetail.item.price)}
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
  }
};

export default PaymentProducts;
