import React from "react";
import "../../../../assets/styles/coat.scss";
import CategoryList from './CategoryList.js';
import { suits2Collection } from "../../data";
import {Link} from 'react-router-dom';
import {URLS} from '../../../../constants/urls';
import { AiOutlineCaretRight } from "react-icons/ai";
import { convertNumberToCurrency } from '../../../../utils/helpers/MoneyConverter'
const Suits_2 = () => {
  return (
    <main >
      <div className="product-page container">
        <CategoryList/>
        <div className="product-list-suits">
      { suits2Collection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
            <Link to={item.index}><img src={item.img}></img></Link> 
            <div className='name-alt'>SUITS</div>
            <div className='name'>{item.code}</div>
            <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
          </div>
        )
      })}
    </div>
    </div>  
    <div className="list-page">
      <ul>
        <li><Link to={URLS.SUITS}><p>1</p></Link></li>
        <li><Link to={URLS.SUITS2}><p>2</p></Link></li>
        <li><Link to={URLS.SUITS2}><p> <AiOutlineCaretRight/></p></Link></li>

      </ul>
    </div>
    </main>
  );
};

export default Suits_2;

