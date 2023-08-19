import { useState } from "react";
import React from "react";
import "../../../assets/styles/coat.scss";
import { convertNumberToCurrency } from "../../../utils/helpers/MoneyConverter";
import { coatCollection } from "../data";
import { useGetProductByCategory } from "../../../libs/business-logic/src/lib/product";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../../libs/business-logic/src/lib/cart/process/hooks";
import { toast } from "react-hot-toast";
const Ec = () => {
  const [selectedCategory, setSelectedCategory] = useState("coat");
  const productData = useGetProductByCategory({ category: selectedCategory });
  const { onAddToCart, isLoading } = useAddToCart();
  console.log(productData);

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
              <button onClick={() => setSelectedCategory("suits")}>
                <h6>SUITS</h6>
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedCategory("blazers")}>
                <h6>BLAZERS</h6>
              </button>
            </li>{" "}
            <li>
              <button onClick={() => setSelectedCategory("coat")}>
                <h6>COAT</h6>
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedCategory("vest")}>
                <h6>VEST</h6>
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedCategory("pants")}>
                <h6>PANTS</h6>
              </button>
            </li>
          </ul>
          <ul>
            <h6>ACCESSORIES</h6>
            <li>
              <button onClick={() => setSelectedCategory("ties")}>
                <h6>TIES</h6>
              </button>
            </li>
          </ul>
        </div>
        <div>
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
