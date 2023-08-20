import React, { useEffect, useState } from "react";
import PriceText from "../../../components/common/text/PriceText/PriceText";
import { filterFabric } from "./dataFabric";
import {
  useGetFabric,
  useGetJacket,
} from "../../../libs/business-logic/src/lib/measure";

const FabricStep = () => {
  const filters = filterFabric;
  const fabrics = useGetFabric();
  const { onGetJacket } = useGetJacket();

  const [selectedIndexProduct, setSelectedIndexProduct] = useState();

  const handleSelectFabric = (fabricName) => {
    onGetJacket({
      fabric: fabricName,
    })
      .then((res) => {
        //
      })
      .catch((err) => {
        console.error("err: ", err);
      });

    window.localStorage.setItem("FABRIC", fabricName);
    setSelectedIndexProduct(fabricName);
  };

  useEffect(() => {
    fabrics && fabrics.length > 0 && handleSelectFabric(fabrics[0].fabricName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fabrics]);

  return (
    <>
      <div className="measure__filter--mn">
        {filters &&
          filters.map((item, index) => {
            return (
              <button className="measure__filter--it" key={index}>
                {item.icon}
                <div>
                  <p>{item.title}</p>
                </div>
              </button>
            );
          })}
      </div>
      <div className="measure__choose--product">
        {fabrics &&
          fabrics.length > 0 &&
          fabrics.map((item, index) => (
            <div className="measure__choose--it" key={index}>
              <img
                src={item.image}
                alt="product"
                className={`${
                  item.fabricName === selectedIndexProduct
                    ? "product--selected"
                    : "product--unselected"
                }`}
                onClick={() => {
                  handleSelectFabric(item.fabricName);
                }}
              />
              <div>
                <span>{item.fabricName} </span>
                <PriceText>{item.price} </PriceText>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FabricStep;
