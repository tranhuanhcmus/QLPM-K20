import React from "react";
import "../../../assets/styles/coat.scss";
import CategoryList from './CategoryList.js';
import {Link} from 'react-router-dom';
import { convertNumberToCurrency } from '../../../utils/helpers/MoneyConverter'
import { suits1Collection } from "../data";
import { AiOutlineCaretRight } from "react-icons/ai";
import {URLS} from '../../../constants/urls'

const Men_1 = () => {
  return (
    <main >
      <div className="product-page container">
        <CategoryList/>
        <div className="product-list-suits">
     { suits1Collection.map((item,index) => {
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
        <li><Link to={URLS.MEN}><p>1</p></Link></li>
        <li><Link to={URLS.MEN2}><p>2</p></Link></li>
        <li><Link to={URLS.MEN3}><p>3</p></Link></li>
        <li><Link to={URLS.MEN2}><p> <AiOutlineCaretRight/></p></Link></li>

      </ul>
    </div>
    </main>
  );
};

export default Men_1;

