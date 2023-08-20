import React from "react";
import styles from "./styles.module.scss";
const PrimaryText = ({ children, style }) => {
  return (
    <div style={style} className={styles.primary}>
      {children}
    </div>
  );
};

export default PrimaryText;
