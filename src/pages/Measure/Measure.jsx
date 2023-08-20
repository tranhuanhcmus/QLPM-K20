/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Measure.scss";
import "../../assets/styles/_config.scss";
import { useNavigate } from "react-router-dom";
import FabricStep from "./Step/FabricStep";
import StyleStep from "./Step/StyleStep";
import { useMeasureContext } from "../../libs/business-logic/src/lib/measure/process/context/measureContext";

const Measure = () => {
  const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);
  const [isFrontView, setIsFrontView] = useState(true);
  const { state } = useMeasureContext();
  const images = state.image;
  const navigate = useNavigate();
  const steps = ["Fabric", "Style"];
  const [currentStep, setCurrentStep] = useState(0);

  const onCheckout = () => {
    window.localStorage.setItem("METHOD", "measure");
    window.localStorage.setItem("MEASURE_DATA", JSON.stringify(state));
    navigate("/payment");
  };

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
              <div
                className={`step ${currentStep === index && `current`}`}
                key={index}
              >
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
            <img src={images.front} alt="try-product" />
          ) : (
            <img src={images.back} alt="try-product" />
          )}
        </div>
        <div className="measure__infor">
          <p>CUSTOMSUIT</p>
          {/* <p>{listTryProduct[selectedIndexProduct].material}</p>
          <p>{listTryProduct[selectedIndexProduct].price} USD</p> */}
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
          <button className={`confirm-btn`} onClick={() => onCheckout()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Measure;
