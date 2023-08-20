import React, { useState,useEffect } from "react";
import PriceText from "../../../components/common/text/PriceText/PriceText";
import { filterFabric,Fabrics } from './dataFabric';


const FabricStep = () => {
  
  const filters=filterFabric
  const [fabrics,setFabrics]=useState([])

  useEffect(() => {
   setFabrics(Fabrics)
  }, []);

  const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);


  return (
    <>
      <div className="measure__filter--mn">
        {filters &&
          filters.map((item, index) => {
            return (
              <button
                className="measure__filter--it"
                key={index}
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
        {fabrics.length>0&&fabrics.map((item, index) => (
          <div className="measure__choose--it" key={index}>
            <img
              src={item.Image}
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
              <span>{item.FabricName} </span>
              <PriceText>{item.Price} </PriceText>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FabricStep;
