import React from "react";
import styles from "./styles.module.scss";
import { useCreateOrder } from "../../../libs/business-logic/src/lib/order/process/hooks/useCreateOrder";
import Heading1 from "../../../components/common/text/Heading1/Heading";
// import { useNavigate } from "react-router-dom";

const PaymentInfo = ({ data }) => {
  const { name, phone, email, address, note } = data;
  const { onCreateOrder } = useCreateOrder();
  // const navigate = useNavigate();

  const handleCheckout = () => {
    onCreateOrder()
      .then((url) => (window.location.href = url))
      .catch((err) => console.error(err));

    // navigate('facebook.com')
  };

  return (
    <>
      <Heading1>user information</Heading1>
      <div className={styles.section}>
        <div className={styles.form__field}>
          <label>Name</label>
          <span>{name}</span>
        </div>

        <div className={styles.row}>
          <div className={styles.form__field}>
            <label>Phone</label>
            <span>{phone}</span>
          </div>
          <div className={styles.form__field}>
            <label>Email</label>
            <span>{email}</span>
          </div>
        </div>

        <div className={styles.form__field}>
          <label>Address</label>
          <span>{address}</span>
        </div>
        <div className={styles.form__field}>
          <label>Note</label>
          <p>{note || "Không"}</p>
        </div>
        <div className={styles.form__field}>
          <label>Payments</label>
          <p>Visa</p>
        </div>

        <div className={styles.actions}>
          <button onClick={handleCheckout}>Confirm Payment</button>
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;
