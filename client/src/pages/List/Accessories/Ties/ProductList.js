// components/ProductList.js
import React from 'react';
import {Link} from 'react-router-dom';
import { convertNumberToCurrency } from '../../../../utils/helpers/MoneyConverter'
import {tiesCollection } from "../../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faPlus, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
const ProductList = () => {
  return (
    <div className="product-list-blazers">
      { tiesCollection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
              <Link to={item.index}><img src={item.img}></img></Link> 
              <div className='name-alt'>Ties</div>
              <div className='name'>{item.code}</div>
              <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
              <div className='buttons'>
              <button className='add-to-cart'>
                <FontAwesomeIcon icon={faPlus} title='Add to Cart' /> 
              </button>
              <button className='remove-from-cart' title='Remove from Cart'>
                <FontAwesomeIcon icon={faTimes} /> 
              </button>
              <button className='add-to-favorites' title='Add to Favorites'>
                <FontAwesomeIcon icon={faHeart} /> 
              </button>
            </div>
         
          </div>
          
        )
      })}
      
    </div>
  );
};

export default ProductList;
