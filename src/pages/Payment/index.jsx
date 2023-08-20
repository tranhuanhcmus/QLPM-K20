import React from 'react'
import styles from "./styles.module.scss"
import PaymentInfoForm from './PaymentInfoForm' 

const Payment = () => {
  return (
	<div className={styles.container}>
    <div className={styles.body}>
      <PaymentInfoForm/>
    </div>
  </div>
  )
}

export default Payment