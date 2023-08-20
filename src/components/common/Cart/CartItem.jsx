import React, { useState } from "react";
import styles from "./Cart.module.scss";
import { convertNumberToCurrency } from "../../../utils/helpers/MoneyConverter";
import {
  useAddToCart,
  useDeleteFromCart,
} from "../../../libs/business-logic/src/lib/cart/process/hooks";
import { toast } from "react-hot-toast";
import { Controller } from "react-hook-form";

const CartItem = ({ data: cartItemData, controlForm }) => {
  const { onAddToCart } = useAddToCart();
  const { onDecreaseItemQuantity, onDeleteItem } = useDeleteFromCart();
  const inputName = `cartItem@${cartItemData.item.id}`;
  const [itemQuantity, setItemQuantity] = useState(cartItemData.quantity);

  const handleIncreaseQuantity = (quantity) => {
    onAddToCart({ item: cartItemData.item, quantity })
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };
  const handleDecreaseQuantity = (quantity) => {
    console.log("DECREASE: ", quantity);
    onDecreaseItemQuantity({ productId: cartItemData.item.id, quantity })
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };
  const handleDeleteItem = () => {
    onDeleteItem(cartItemData.item.id)
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };

  const handleQuantityChange = ({ event, quantity }) => {
    const targetQuantity = quantity ? quantity : Number(event.target.value);
    setItemQuantity(targetQuantity);
    if (targetQuantity === 0) {
      handleDeleteItem();
    } else {
      const amountToChange = cartItemData.quantity - targetQuantity;
      if (amountToChange < 0) {
        handleIncreaseQuantity(amountToChange * -1);
      } else if (amountToChange > 0) {
        handleDecreaseQuantity(amountToChange);
      }
    }
  };

  return (
    <div className={styles.item}>
      <img src={cartItemData.item.image} alt="item" />
      <div className={styles.item__info}>
        <div className={styles.item__info__name}>{cartItemData.item.name}</div>
        <div className={styles.item__price}>
          <div className={styles.item__price__value}>
            {convertNumberToCurrency("usd", cartItemData.item.price)}
          </div>
          <div className={styles.item__price__number}>
            <Controller
              name={inputName}
              control={controlForm.control}
              render={({ field }) => (
                <>
                  <input
                    id={inputName}
                    {...field}
                    min={0}
                    value={itemQuantity}
                    type="number"
                    onChange={(event) => handleQuantityChange({ event })}
                  />

                  <div className={styles.actions__change}>
                    <button
                      onClick={() =>
                        handleQuantityChange({
                          quantity: itemQuantity + 1,
                        })
                      }
                    >
                      <i className="fi fi-rr-add"></i>
                    </button>
                    <button
                      onClick={() =>
                        handleQuantityChange({
                          quantity: itemQuantity - 1,
                        })
                      }
                    >
                      <i className="fi fi-rr-minus-circle"></i>
                    </button>
                  </div>
                </>
              )}
            />
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleDeleteItem}>
          <i className="fi fi-rs-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
