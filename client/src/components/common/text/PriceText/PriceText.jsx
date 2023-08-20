import React from "react";
import styles from "./styles.module.scss";
const PriceText = ({ children, style }) => {
  return (
    <div style={style} className={styles.price}>
      {children}
    </div>
  );
};

export default PriceText;
