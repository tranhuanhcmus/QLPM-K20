import React from "react";
import styles from "./styles.module.scss";
import PaymentInfo from "../PaymentInfo";
import PaymentProducts from "../PaymentProducts";
import { useLocation } from "react-router-dom";

const PaymentDetails = () => {
  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <PaymentProducts />
        {state && <PaymentInfo data={state} />}
      </div>
    </div>
  );
};

export default PaymentDetails;
