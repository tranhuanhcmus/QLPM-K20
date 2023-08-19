import React from "react";
import styles from "./Cart.module.scss";
import CartList from "./CartList";
import { Images } from "./image";
import { CartService } from "./../../libs/services/src/lib/cartService/index";
import { useNavigate } from "react-router-dom";
import { URLS } from "./../../constants/urls";

// type ProductData={
// 	productId:string,
// 	price:string,
// 	image:string,
// 	name:string,
// 	description:string,
// 	discount:string,
// 	fabric:string,
// 	fabricName:string,
// 	color:string,
// 	type:string,
// }

const data = [
  {
    productId: 1,
    price: "110.00",
    name: "Original Vest 1",
    number: 1,
    image: Images.item,
  },
  {
    productId: 2,
    price: "120.00",
    name: "Original Vest 2",
    number: 1,
    image: Images.item,
  },
  {
    productId: 3,
    price: "130.00",
    name: "Original Vest",
    number: 1,
    image: Images.item,
  },
  {
    productId: 4,
    price: "140.00",
    name: "Original Vest",
    number: 1,
    image: Images.item,
  },
  {
    productId: 5,
    price: "150.00",
    name: "Original Vest",
    number: 1,
    image: Images.item,
  },
  {
    productId: 6,
    price: "160.00",
    name: "Original Vest",
    number: 1,
    image: Images.item,
  },
  {
    productId: 7,
    price: "170.00",
    name: "Original Vest",
    number: 1,
    image: Images.item,
  },
  {
    productId: 8,
    price: "180.00",
    name: "Original Vest",
    number: 1,
    image: Images.item,
  },
];

const Cart = ({ showCart }) => {
  const [isShow, setShow] = React.useState();
  const [subTotal, setSubTotal] = React.useState(190);
  const [shipping, setShipping] = React.useState(20);
  const [discount, setDiscount] = React.useState(50);
  const [total, setTotal] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    setShow(showCart);
  }, [showCart]);

  React.useEffect(() => {
    const total = CartService.calculateTotal(subTotal, shipping, discount);
    setTotal(total);
  }, [subTotal, shipping, discount]);

  const onCheckout = () => {
    setShow(false);
    navigate(URLS.PAYMENT);
  };

  const onWishList = () => {
    setShow(false);
    navigate(URLS.WISH_LIST);
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
          <CartList data={data} />
          <div className={styles.total}>
            <p>
              <b>Subtotal:</b> <span>{subTotal}</span>
            </p>
            <p>
              <b>Shipping:</b> <span>{shipping}</span>
            </p>
            <p>
              <b>Discount:</b> <span>{discount}</span>
            </p>
            <p>
              <b>Total:</b> <span>{total}</span>
            </p>
          </div>
          <div className={styles.foot}>
            <span onClick={onWishList}>Your WishList</span>
            <button onClick={onCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
