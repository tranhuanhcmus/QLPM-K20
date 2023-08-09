import React from "react";
import "../../../assets/styles/coat.scss";
import CategoryList from './CategoryList.js';
import {Link} from 'react-router-dom';
import { convertNumberToCurrency } from '../../../utils/helpers/MoneyConverter'
import {coatCollection } from "../data";
import {blazersCollection } from "../data";
import { AiOutlineCaretRight } from "react-icons/ai";
import {URLS} from '../../../constants/urls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faPlus, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
const Men_3 = () => {
  return (
    <main >
      <div className="product-page container">
        <CategoryList/>
        <div className="product-list-blazers">
        { coatCollection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
            <Link to={item.index}><img src={item.img}></img></Link> 
            <div className='name-alt'>COAT</div>
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
      { blazersCollection.map((item,index) => {
        return(
          <div className='product-list__item' key={index}>
            <Link to={item.index}><img src={item.img}></img></Link> 
            <div className='name-alt'>BLAZERS</div>
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
    </div>
    <div className="list-page">
      <ul>
        <li><Link to={URLS.MEN}><p>1</p></Link></li>
        <li><Link to={URLS.MEN2}><p>2</p></Link></li>
        <li><Link to={URLS.MEN3}><p>3</p></Link></li>
        <li><Link to={URLS.MEN3}><p> <AiOutlineCaretRight/></p></Link></li>

      </ul>
    </div>
    </main>
  );
};

export default Men_3;

