// components/ProductList.js
import React from 'react';
import {Link} from 'react-router-dom';
import { convertNumberToCurrency } from '../../../../utils/helpers/MoneyConverter'

import {tailoredSuitsCollection } from "../../data";
const ProductList = () => {
  return (
    <div className="product-list-coat">
      { tailoredSuitsCollection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
            <Link to={item.index}><img src={item.img}></img></Link> 
            <div className='name-alt'>Tailored Suits for Groom and Groomsmen</div>
            <div className='name'>{item.code}</div>
            <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
          </div>
        )
      })}
    </div>
  );
};

export default ProductList;
