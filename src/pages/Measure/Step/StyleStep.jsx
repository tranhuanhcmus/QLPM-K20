/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { data, typesCloth } from "./dataStyle";
import {
  useGetJacket,
  useGetPants,
  useGetVest,
} from "../../../libs/business-logic/src/lib/measure";

const getDefaultStyle = (type) => {
  const defaultOptions = {};

  const typeData = data[type];
  if (typeData) {
    for (const key in typeData) {
      if (typeData.hasOwnProperty(key)) {
        const options = typeData[key];
        if (Array.isArray(options) && options.length > 0) {
          defaultOptions[key] = options[0].name;
        }
      }
    }
  }

  return defaultOptions;
};

const StyleStep = () => {
  const types = typesCloth;

  const [type, setType] = useState("Jacket");
  const [style, setStyle] = useState("Style");
  const [styleData, setStyleData] = useState();
  const { onGetJacket } = useGetJacket();
  const { onGetVest } = useGetVest();
  const { onGetPants } = useGetPants();

  const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);
  const [formApi, setFormApi] = useState(getDefaultStyle("Jacket"));

  useMemo(() => {
    switch (type) {
      case "Jacket": {
        onGetJacket(formApi)
          .then((res) => {})
          .catch((err) => console.error(err));
        break;
      }
      case "Vest": {
        onGetVest(formApi)
          .then((res) => {})
          .catch((err) => console.error(err));
        break;
      }
      case "Pants": {
        onGetPants(formApi)
          .then((res) => {})
          .catch((err) => console.error(err));
        break;
      }
      default:
        break;
    }
  }, [formApi]);

  useEffect(() => {
    const fabric = window.localStorage.getItem("FABRIC");
    setFormApi({
      ...getDefaultStyle(type),
      fabric,
    });
  }, [type]);

  useEffect(() => {
    setFormApi({
      ...formApi,
      [style]: data[type][style][selectedIndexProduct].name,
    });
  }, [selectedIndexProduct]);

  useEffect(() => {
    setStyleData(data[type][style]);
  }, [type, style]);

  return (
    <>
      <div className="measure__filter--mn">
        {types &&
          types.map((item, index) => {
            return (
              <button
                onClick={() => setType(item.name)}
                className="measure__filter--it"
                key={item.name + index}
              >
                <div>
                  <p>{item.name}</p>
                  <ul>
                    {item.name === type &&
                      item.subType.map((field) => {
                        return (
                          <li
                            onClick={() => {
                              setType(item.name);
                              setStyle(field.name);
                            }}
                            key={field.name}
                          >
                            {field.name}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </button>
            );
          })}
      </div>
      <div className="measure__choose--product">
        {styleData?.length > 0 &&
          styleData.map((item, index) => (
            <div className="measure__choose--it" key={item.name}>
              <div>
                <img
                  src={item.img}
                  alt="img"
                  className={`${
                    index === selectedIndexProduct
                      ? "product--selected"
                      : "product--unselected"
                  }`}
                  onClick={() => {
                    setSelectedIndexProduct(index);
                  }}
                />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default StyleStep;
