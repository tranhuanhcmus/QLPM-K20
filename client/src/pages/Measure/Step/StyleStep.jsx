import React, { useState, useEffect } from "react";
import PriceText from "../../../components/common/text/PriceText/PriceText";
import { filterFabric, Fabrics } from "./dataFabric";
import { data, typesCloth } from "./dataStyle";

const StyleStep = () => {
  const types = typesCloth;

  const [type, setType] = useState("Jacket");
  const [style, setStyle] = useState("Style");

  const [styleData, setStyleData] = useState();

  const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);

  useEffect(() => {
    setStyleData(data[type][style]);
  }, [type, style]);

  return (
    <>
      <div className="measure__filter--mn">
        {types &&
          types.map((item, index) => {
            return (
              <button onClick={()=>setType(item.name)} className="measure__filter--it" key={index}>
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
            <div className="measure__choose--it" key={index}>
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
