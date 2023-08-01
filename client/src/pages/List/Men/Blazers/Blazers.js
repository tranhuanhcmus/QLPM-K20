import React from "react";
import "../../../../assets/styles/coat.scss";
import CategoryList from './CategoryList.js';
import ProductList from './ProductList';

const BLAZERS = () => {
  return (
    <main className="product-page container">
        <CategoryList/>
        <ProductList />
    </main>
  );
};

export default BLAZERS;

