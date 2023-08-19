import React from 'react'
import styles from './styles.module.scss'
const Heading1 = ({children,style}) => {
  return (
	<div style={style} className={styles.heading1}>{children}</div>
  )
}

export default Heading1