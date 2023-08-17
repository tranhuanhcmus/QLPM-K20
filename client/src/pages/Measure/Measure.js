import React, { useState } from "react";
import logoImage from "../../assets/images/logos/sc-non.png";
import "./Measure.scss";
import "../../assets/styles/_config.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  listTryProduct,
  listItemMeasureFilter,
} from "../../assets/constant/index";

const Measure = () => {
  const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);
  const [isFrontView, setIsFrontView] = useState(true);
  const [tagCloth, setTagCloth] = useState(0);
  const navigate = useNavigate();

  const filteredProducts = listTryProduct.filter(
    (item) => item.tags.indexOf(tagCloth) !== -1 || tagCloth === 0
  );

  return (
    <div className="measure-container">
      <div className="measure-head">
        <button className="measure-head-back" onClick={() => navigate(-1)}>
          <i className="fi fi-bs-angle-left" />
          Quay lại
        </button>
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>

      <div className="measure-body">
        <div className="measure__filter--mn">
          {listItemMeasureFilter &&
            listItemMeasureFilter.map((item, index) => {
              return (
                <button
                  className="measure__filter--it"
                  key={index}
                  onClick={() => setTagCloth(index)}
                >
                  {item.icon}
                  <div>
                    <p>{item.title}</p>
                  </div>
                </button>
              );
            })}
        </div>
        <div className="measure__choose--product">
          {filteredProducts.map((item, index) => (
            <div className="measure__choose--it" key={index}>
              <img
                src={item.cloth}
                alt="product"
                className={`${
                  index === selectedIndexProduct
                    ? "product--selected"
                    : "product--unselected"
                }`}
                onClick={() => {
                  setSelectedIndexProduct(index);
                }}
              />
              <div>
                <small>{item.price} USD</small>
              </div>
            </div>
          ))}
        </div>
        <div className="measure__swear--suit">
          {isFrontView ? (
            <img
              src={listTryProduct[selectedIndexProduct].view_front}
              alt="try-product"
            />
          ) : (
            <img
              src={listTryProduct[selectedIndexProduct].view_end}
              alt="try-product"
            />
          )}
        </div>
        <div className="measure__infor">
          <p>CUSTOMSUIT</p>
          <p>{listTryProduct[selectedIndexProduct].material}</p>
          <p>{listTryProduct[selectedIndexProduct].price} USD</p>
          <div className="measure_infor_btn">
            <button
              className={` ${
                isFrontView
                  ? "measure__infor__btn--it--selected"
                  : "measure__infor__btn--it"
              }`}
              onClick={() => setIsFrontView(true)}
            >
              Front
            </button>
            <button
              className={` ${
                !isFrontView
                  ? "measure__infor__btn--it--selected"
                  : "measure__infor__btn--it"
              }`}
              onClick={() => setIsFrontView(false)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measure;
