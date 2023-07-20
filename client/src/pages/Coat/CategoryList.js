import React from 'react';
import { Link } from 'react-router-dom';
import {categoriesItem1,categoriesItem2,categoriesItem3,categoriesItem4 } from "./data";
const CategoryList = () => {
  return (

    <div className="category-list">
          <div className="title">
      <h2 className="title-template">COAT COLLECTION</h2>
          </div>
              <ul >
              <Link to="/Coat"><h>MEN</h></Link> 
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
              <Link to="/Coat"><h>WEDDING</h></Link> 
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
              <Link to="/Coat"><h>ACCESSORIES</h></Link> 
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
