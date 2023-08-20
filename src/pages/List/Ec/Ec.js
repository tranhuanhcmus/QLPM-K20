import { useState } from "react";
import React from "react";
import "../../../assets/styles/coat.scss";
import { convertNumberToCurrency } from "../../../utils/helpers/MoneyConverter";
import { useGetProductByCategory } from "../../../libs/business-logic/src/lib/product";
import { Link, useLocation } from "react-router-dom";
import { useAddToCart } from "../../../libs/business-logic/src/lib/cart/process/hooks";
import { toast } from "react-hot-toast";
import { useWishlist } from "../../../libs/business-logic/src/lib/wishlist/process/hooks";
import { parseSearchParams } from "../../../utils/helpers/params";
import { URLS } from "../../../constants/urls";

const Ec = () => {
  const location = useLocation();
  const params = parseSearchParams(location.search);
  const [selectedCategory, setSelectedCategory] = useState(params.category);
  const productData = useGetProductByCategory({ category: selectedCategory });
  const { onAddToCart, isLoading } = useAddToCart();
  const { addToWishlist } = useWishlist();

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    window.history.pushState(null, "", URLS.COAT + "?category=" + category);
  };

  const handleAddToCart = (product) => {
    onAddToCart({ item: product, quantity: 1 })
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <div className="product-page container">
        <div className="category-list">
          <div className="title">
            <h2 className="title-template">MEN COLLECTION</h2>
          </div>
          <ul>
            <h6>MEN</h6>
            <li>
              <button onClick={() => handleUpdateCategory("suits")}>
                <h6>SUITS</h6>
              </button>
            </li>
            <li>
              <button onClick={() => handleUpdateCategory("blazers")}>
                <h6>BLAZERS</h6>
              </button>
            </li>{" "}
            <li>
              <button onClick={() => handleUpdateCategory("coat")}>
                <h6>COAT</h6>
              </button>
            </li>
            <li>
              <button onClick={() => handleUpdateCategory("vest")}>
                <h6>VEST</h6>
              </button>
            </li>
            <li>
              <button onClick={() => handleUpdateCategory("pants")}>
                <h6>PANTS</h6>
              </button>
            </li>
          </ul>
          <ul>
            <h6>ACCESSORIES</h6>
            <li>
              <button onClick={() => handleUpdateCategory("ties")}>
                <h6>TIES</h6>
              </button>
            </li>
          </ul>
        </div>
        <div className="product-list__wrapper">
          <h5>Result for {selectedCategory}</h5>
          <hr />
          <div className={`product-list ${selectedCategory}`}>
            {Array.isArray(productData) ? (
              productData.map((p) => (
                <div className="product-list__item" key={`product${p.id}`}>
                  <Link to="/">
                    <img src={p.image} alt="item"></img>
                  </Link>
                  <div className="name-alt">{p.type}</div>
                  <div className="name">{p.name}</div>
                  <div className="price">
                    From <span>{convertNumberToCurrency("usd", p.price)}</span>
                  </div>
                  <div className="buttons-coat">
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={isLoading}
                    >
                      <i className="fi fi-rs-shopping-cart-add"></i>
                      Add to cart
                    </button>
                    <button
                      className="add-to-wishlist"
                      onClick={() => {
                        addToWishlist(p)
                          .then((msg) => toast.success(msg))
                          .catch((err) => toast.error(err.message));
                      }}
                    >
                      <i className="fi fi-rs-heart"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ec;
