import React from 'react'
import styles from "./styles.module.scss"
import PaymentInfo from '../PaymentInfo';
import PaymentProducts from '../PaymentProducts';
import { useLocation } from 'react-router-dom';


const PaymentDetails = () => {

  const {state}=useLocation()
  console.log(state);

  return (
	<div className={styles.container}>
    <div className={styles.body}>
        <div className={styles.heading}>State</div >
        <div className={styles.status}> Waiting for payment</div>
      <PaymentProducts/>
      {state&&<PaymentInfo data={state}/>}
    </div>
  </div>
  )
}

export default PaymentDetails