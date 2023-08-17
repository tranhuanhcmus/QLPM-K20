import React from "react";
import styles from "./styles.module.scss";

const PaymentInfo = ({data}) => {
  const {name,phone,email,address,note}=data
  return (
    <>
    <div className={styles.heading}>user information</div >
    <section>
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
        <p>
          {note}
        </p>
      </div>
      <div className={styles.form__field}>
        <label>Payments</label>
        <p>
          Banking
        </p>
        <p>
          Momo
        </p>
      </div>

      <div className={styles.actions} >
        <button >Cancel</button>
        <button type="submit" >Confirm Payment</button>
      </div>
    </section>
    </>
  );
};

export default PaymentInfo;
