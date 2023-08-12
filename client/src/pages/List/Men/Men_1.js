import React from "react";
import "../../../assets/styles/coat.scss";
import CategoryList from './CategoryList.js';
import { Link } from 'react-router-dom';
import { convertNumberToCurrency } from '../../../utils/helpers/MoneyConverter'
import { suits1Collection } from "../data";
import { ReactComponent as FlaticonArrow } from '../../../assets/images/icons/coatButtons/arrow-right.svg'; 
import { URLS } from '../../../constants/urls'
import { ReactComponent as FlaticonPlus } from '../../../assets/images/icons/coatButtons/shopping-cart.svg'; 
import { ReactComponent as FlaticonHeart } from '../../../assets/images/icons/coatButtons/heart.svg'; 
import { ReactComponent as FlaticonTimes } from '../../../assets/images/icons/coatButtons/cross.svg'; 

const Men_1 = () => {
  return (
    <main>
      <div className="product-page container">
        <CategoryList />
        <div className="product-list-suits">
          {suits1Collection.map((item, index) => {
            return (
              <div className='product-list__item' key={index}>
                <Link to={item.index}><img src={item.img}></img></Link>
                <div className='name-alt'>SUITS</div>
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
      </div>
      <div className="list-page">
        <ul>
          <li><Link to={URLS.MEN}><p>1</p></Link></li>
          <li><Link to={URLS.MEN2}><p>2</p></Link></li>
          <li><Link to={URLS.MEN3}><p>3</p></Link></li>
          <li><Link to={URLS.MEN2}><p> <FlaticonArrow /></p></Link></li>
        </ul>
      </div>
    </main>
  );
};

export default Men_1;
