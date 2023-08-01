// components/ProductList.js
import React from 'react';
import {Link} from 'react-router-dom';
import { convertNumberToCurrency } from '../../utils/helpers/MoneyConverter'

import {coatCollection } from "./data";
const ProductList = () => {
  return (
    <div className="product-list">
      { coatCollection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
            <Link to={item.index}><img src={item.img}></img></Link> 
            <div className='name-alt'>COAT</div>
            <div className='name'>{item.code}</div>
            <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
          </div>
        )
      })}
    </div>
  );
};

export default ProductList;
