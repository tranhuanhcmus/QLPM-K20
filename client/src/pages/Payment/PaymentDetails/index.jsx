import React from "react";
import styles from "./styles.module.scss";
import PaymentInfo from "../PaymentInfo";
import PaymentProducts from "../PaymentProducts";
import { useLocation } from "react-router-dom";
import Heading1 from "../../../components/common/text/Heading1/Heading";
import PrimaryText from "../../../components/common/text/PrimaryText/PrimaryText";

const PaymentDetails = () => {
  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Heading1>State</Heading1>
        <PrimaryText> Waiting for payment</PrimaryText>
        <PaymentProducts />
        {state && <PaymentInfo data={state} />}
      </div>
    </div>
  );
};

export default PaymentDetails;
