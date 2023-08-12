// components/ProductList.js
import React from 'react';
import {Link} from 'react-router-dom';
import { convertNumberToCurrency } from '../../../../utils/helpers/MoneyConverter'

import {coatCollection } from "../../data";
import { ReactComponent as FlaticonPlus } from '../../../../assets/images/icons/coatButtons/shopping-cart.svg'; 
import { ReactComponent as FlaticonHeart } from '../../../../assets/images/icons/coatButtons/heart.svg'; 
import { ReactComponent as FlaticonTimes } from '../../../../assets/images/icons/coatButtons/cross.svg'; 
const ProductList = () => {
  return (
    <div className="product-list-coat">
      { coatCollection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
            <Link to={item.index}><img src={item.img}></img></Link> 
            <div className='name-alt'>COAT</div>
            <div className='name'>{item.code}</div>
            <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
            <div className='buttons-coat'>
              <button className='add-to-cart'>
              <FlaticonPlus title='Add to Cart' />
                  </button>
                  <button className='remove-from-cart' title='Remove from Cart'>
                    <FlaticonTimes />
                  </button>
                  <button className='add-to-favorites' title='Add to Favorites'>
                    <FlaticonHeart />
                  </button>
            </div>
         
          </div>
        )
      })}
    </div>
  );
};

export default ProductList;
