import React from "react";
import '../../../../assets/styles/coat.scss';
import CategoryList from './CategoryList.js';
import ProductList from './ProductList';

const Ties = () => {
  return (
    <main className="product-page container">
        <CategoryList/>
        <ProductList />
    </main>
  );
};

export default Ties;

