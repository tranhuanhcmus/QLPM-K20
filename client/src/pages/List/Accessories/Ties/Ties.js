import React from "react";
import '../../../../assets/styles/coat.scss';
import CategoryList from './CategoryList.js';
import ProductList from './ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faPlus, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
const Ties = () => {
  return (
    <main className="product-page container">
        <CategoryList/>
        <ProductList />
    </main>
  );
};

export default Ties;

