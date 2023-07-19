// components/ProductList.js
import React from 'react';
import {Link} from 'react-router-dom';

import {coatCollection } from "./data";
const ProductList = () => {
  return (
    <div className="product-list">
      <ul>
        { coatCollection.map((item,index) => {
          return(
          <li key={index}>
           <Link to={item.index}><img src={item.img}></img></Link> 
           <div className='name-alt'>COAT</div>
           <div className='name'>{item.code}</div>
           <div className='price'>From {item.price}$</div>

          </li>
          )
        })
      }
      </ul>
    </div>
  );
};

export default ProductList;
