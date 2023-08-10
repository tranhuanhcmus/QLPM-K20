import React from 'react'
import styles from "./Cart.module.scss";
import CartItem from './CartItem';
import { useEffect } from 'react';
import { Images } from './image';


const CartList = ({data}) => {

	const [list,setList]=React.useState([])

	useEffect(() => {
		setList(data)
	}, [data]);

	const handleDelete=(productId)=>{
		const newList=list.filter((item)=>item.productId!==productId)
		setList(newList)
	}

  return (
	<div className={styles.body}>
      {list && list.length > 0 ? (
        list.map((item) => (
          <CartItem key={item.productId} data={item} handleDelete={handleDelete} />
        ))
      ) : (
        <img src={Images.emptyCart} className={styles.emptyCart}/>
      )}
    </div>
  )
}

export default CartList