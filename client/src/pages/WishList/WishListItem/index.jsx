import React from "react";
import styles from "./styles.module.scss";

const WishListItem = ({ data, addToCart, deleteItem }) => {
  const onAddToCart = () => {
    addToCart(data.productId);
  };
  const onDelete = () => {
    deleteItem(data.productId);
  };

  return (
    <div className={styles.item}>
      <img src={data.image} alt="item" />
      <div className={styles.item__info}>
        <div className={styles.item__info__name}>{data.name}</div>
        <div className={styles.item__price}>
          <div className={styles.item__price__value}>{data.price}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onDelete}>
          <i className="fi fi-rs-trash"></i>
        </button>
        <button onClick={onAddToCart}>
          <i className="fi fi-rr-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
};

export default WishListItem;
