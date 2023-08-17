import React from "react";
import styles from "./styles.module.scss";
import { Images } from "./../../../components/Cart/image";

const data = [
  {
    productId: 1,
    price: "110.00",
    name: "Original Vest 1",
    number: 2,
    image: Images.item,
  },
  {
    productId: 2,
    price: "120.00",
    name: "Original Vest 2",
    number: 5,
    image: Images.item,
  },
];

const PaymentProducts = () => {
  return (
    <>
      <div className={styles.heading}>Products </div>

      <div className={styles.products}>
        {data.map((item) => (
          <div key={item.productId} className={styles.product}>
            <img src={item.image} alt="product" />
            <div className={styles.product__info}>
              <span className={styles.product__name}>{item.name}</span>
              <span className={styles.product__number}>{item.number}</span>
              <span className={styles.product__price}>{item.price}</span>
              <p className={styles.product__note}>
                Fabric type: A .. Fabric type: A .. Fabric type: A .. Fabric
                type: A .. Fabric type: A .. Fabric type: A .. Fabric type: A ..
                Fabric type: A .. Fabric type: A .. Fabric type: A .. Fabric
                type: A .. Fabric type: A
              </p>
            </div>
          </div>
        ))}
      </div>

	  <hr />
		<div className={styles.total}>
			<div>
				<span className={styles.label}>
				Shipping:
				</span>
				<span className={styles.value}>
				450.00
				</span>
			</div>
			<div>
				<span className={styles.label}>
				Discount:
				</span>
				<span className={styles.value}>
				450.00
				</span>
			</div>
			<div>
				<span className={styles.label}>
				Total:
				</span>
				<span className={styles.value}>
				450.00
				</span>
			</div>
			
		</div>
    </>
  );
};

export default PaymentProducts;
