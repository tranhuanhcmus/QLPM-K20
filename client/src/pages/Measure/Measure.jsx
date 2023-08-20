import React, { useState } from "react";
import "./Measure.scss";
import "../../assets/styles/_config.scss";
import { useNavigate } from "react-router-dom";
import PriceText from "../../components/common/text/PriceText/PriceText";
import {
  listTryProduct,
  listItemMeasureFilter,
} from "../../assets/constant/index";
import FabricStep from "./Step/FabricStep";
import StyleStep from "./Step/StyleStep";



const Measure = () => {
  const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);
  const [isFrontView, setIsFrontView] = useState(true);

  const navigate = useNavigate();
  const steps = ["Fabric", "Style"];
  const [currentStep, setCurrentStep] = useState(0);


  return (
    <div className="measure-container">
      <div className="measure-head">
        <button className="measure-head-back" onClick={() => navigate(-1)}>
          <i className="fi fi-bs-angle-left" />
          Quay lại
        </button>
        <div className="steps">
          {steps.map((item, index) => {
            return (
              <div className={`step ${currentStep === index && `current`}`}>
                <button onClick={() => setCurrentStep(index)}>{item}</button>
                <i className="fi fi-rr-angle-small-right"></i>
              </div>
            );
          })}
        </div>
      </div>

      <div className="measure-body">
        {currentStep === 0 && <FabricStep />}
        {currentStep === 1 && <StyleStep />}
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
          <button
            className={`confirm-btn`}
            onClick={() => setIsFrontView(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Measure;
