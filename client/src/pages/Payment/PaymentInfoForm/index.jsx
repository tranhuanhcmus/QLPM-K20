import React from "react";
import styles from "./styles.module.scss";
import {  useNavigate } from 'react-router-dom';
import { URLS } from "../../../constants/urls";

const PaymentInfoForm = () => {
  const navigate=useNavigate()
  const onSubmit=(e)=>{
    e.preventDefault(); 

    const formData = {
      name: e.target.NAME.value,
      phone: e.target.PHONE.value,
      email: e.target.EMAIL.value,
      address: e.target.ADDRESS.value,
      note: e.target.NOTE.value
    };

    navigate(URLS.PAYMENT_DETAILS,{ state:formData})
  }

  const onCancel=()=>{
    navigate(URLS.HOME_PAGE)
  }

  return (
    <>
    <div className={styles.heading}>user information</div >
    <form onSubmit={onSubmit}>
      <div className={styles.form__field}>
        <label htmlFor="NAME">Name</label>
        <input type="text" id="NAME" required />
      </div>

      <div className={styles.row}>
        <div className={styles.form__field}>
          <label htmlFor="PHONE">Phone</label>
          <input type="tel" id="PHONE" required />
        </div>
        <div className={styles.form__field}>
          <label htmlFor="EMAIL">Email</label>
          <input type="email" id="EMAIL" required />
        </div>
      </div>

      <div className={styles.form__field}>
        <label htmlFor="ADDRESS">Address</label>
        <input type="text" id="ADDRESS" required />
      </div>
      <div className={styles.form__field}>
        <label htmlFor="NOTE">Note</label>
        <textarea type="text" id="NOTE" />
      </div>

      <div className={styles.actions} >
        <button onClick={onCancel} >Cancel</button>
        <input type="submit" />
      </div>
    </form>
    </>
  );
};

export default PaymentInfoForm;
