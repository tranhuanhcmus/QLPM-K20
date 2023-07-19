import React from "react";
import "./Coat.scss";
import CategoryList from './CategoryList.js';
import ProductList from './ProductList';

const Coat = () => {
  return (
    <div className="product-page">
      <CategoryList/>
      <ProductList />
    </div>
  );
};

export default Coat;

