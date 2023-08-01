import React from 'react';
import { Link } from 'react-router-dom';
import {categoriesItem1,categoriesItem3,categoriesItem4 } from "../../data";
import { URLS } from '../../../../constants/urls';
const CategoryList = () => {
  return (

    <div className="category-list">
          <div className="title">
      <h2 className="title-template">SUITS COLLECTION</h2>
          </div>
              <ul >
              <Link to={URLS.MEN}><h>MEN</h></Link> 
                { categoriesItem1.map((item,index) => {
                  return(
                    <li key={index}>
                      <Link to={item.url}><h>{item.name}</h></Link>   
                    </li>
   
                    )
                  })
                }
              </ul>
              <ul >
              <Link to={URLS.WEDDING}><h>WEDDING</h></Link> 
              { categoriesItem3.map((item,index) => {
                  return(
                    <li key={index}>
                      <Link to={item.url}><h>{item.name}</h></Link>   
                    </li>
   
                    )
                  })
                }
              </ul>
              <ul >
              <Link to={URLS.ACCESSORIES}><h>ACCESSORIES</h></Link> 
              { categoriesItem4.map((item,index) => {
                  return(
                    <li key={index}>
                      <Link to={item.url}><h>{item.name}</h></Link>   
                    </li>
   
                    )
                  })
                }
              </ul>
             
              
        
         
    </div>
  );
};

export default CategoryList;
