import React from "react";
import styles from "./Cart.module.scss";
import { Images } from "./image";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../libs/business-logic/src/lib/cart/process/context";
import CartItem from "./CartItem";
import { useForm } from "react-hook-form";
import { useClearCart } from "../../../libs/business-logic/src/lib/cart/process/hooks";
import { toast } from "react-hot-toast";

const calcTotal = (cart) => {
  return Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0)
    : 0;
};

const Cart = ({ showCart }) => {
  const { state } = useCartContext();
  const { onClearCart } = useClearCart();
  const [cartData, setCartData] = React.useState(state.cart);
  const [isShow, setShow] = React.useState();
  const [total, setTotal] = React.useState(0);
  const cartForm = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    setCartData(state.cart);
    setTotal(calcTotal(state.cart));
  }, [state.cart]);

  React.useEffect(() => {
    setShow(showCart);
  }, [showCart]);

  const onCheckout = () => {
    setShow(false);
    navigate({ pathname: "/payment" });
  };

  const handleClearCart = () => {
    onClearCart()
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };

  return (
    <>
      {isShow && (
        <div className={styles.cart}>
          <div className={styles.head}>
            <i className="fi fi-rr-shopping-cart"></i>
            <span>Your Cart</span>
            <button onClick={() => setShow(false)}>
              <i className="fi fi-rs-circle-xmark"></i>
            </button>
          </div>
          <div className={styles.body}>
            {cartData && cartData.length > 0 ? (
              cartData.map((cartItem) => (
                <CartItem
                  key={cartItem.item.id}
                  data={cartItem}
                  controlForm={cartForm}
                />
              ))
            ) : (
              <img
                src={Images.emptyCart}
                className={styles.emptyCart}
                alt="empty"
              />
            )}
          </div>
          <div className={styles.total}>
            <p>
              <b>Total:</b> <span>{total}</span>
            </p>
          </div>
          <div className={styles.foot}>
            <button onClick={onCheckout}>Checkout</button>
            <button onClick={handleClearCart}>Clear cart</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
