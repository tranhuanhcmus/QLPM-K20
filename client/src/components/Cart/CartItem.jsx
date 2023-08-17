import React from 'react'
import styles from "./Cart.module.scss";
import { useEffect } from 'react';

const CartItem = ({data,handleDelete}) => {
	const [number,setNumber]=React.useState(1)

	useEffect(() => {
		setNumber(data?.number||1)
	}, []);

	const handleNumberChange = (amount) => {
		const newValue=number+amount
		
		setNumber(newValue);
	};
	
	useEffect(() => {
		if(number<=0){
			handleDelete(data.productId)
		}
	}, [number]);

  return (
	<div className={styles.item}>
		<img src={data.image} alt="item" />
		<div className={styles.item__info}>
		  <div className={styles.item__info__name}>{data.name}</div>
		  <div className={styles.item__price}>
			<div className={styles.item__price__value}>
			  {data.price}
			</div>
			<div className={styles.item__price__number}>
			  <input type="number"  value={number} onChange={(e) => setNumber(parseInt(e.target.value))}/>
				<div className={styles.actions__change}>
					<button onClick={()=>handleNumberChange(1)}>
					  <i className="fi fi-rr-add"></i>
					</button>
					<button onClick={()=>handleNumberChange(-1)}>
					  <i className="fi fi-rr-minus-circle"></i>
					</button>
				</div>
			</div>
		  </div>
		</div>
		<div className={styles.actions}>
		  <button onClick={()=>handleDelete(data.productId)}>
			<i className="fi fi-rs-trash"></i>
		  </button>
		</div>
	  </div>
  )
}

export default CartItem