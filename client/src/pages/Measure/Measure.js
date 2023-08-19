import React, { useState } from "react";
import logoImage from "../../assets/images/logos/sc-non.png";
import "./Measure.scss";
import {Link, useNavigate} from "react-router-dom"
import { listTryProduct, listItemMeasureFilter } from "../../assets/constant/index";

const Measure =()=>{
    const [selectedIndexProduct, setSelectedIndexProduct] = useState(0)
    const navigate = useNavigate();
    return (
        <div className="measure-container"> 
            <div className="measure-head"> 
                <button className="measure-head-back" onClick={() => navigate(-1)}> 
                    <i className="fi fi-bs-angle-left"/> 
                    Quay lại
                </button>
                <Link to="/"> 
                    <img src={logoImage} alt="Logo"  />
                </Link>
            </div>
          
            <div className="measure-body">
                <div className="measure__filter--mn">
                    {
                        listItemMeasureFilter && listItemMeasureFilter.map((item, index)=>{
                            return(
                                <button className="measure__filter--it" key={index}>
                                    {item.icon}
                                    <div>
                                        <small>{item.title}</small>
                                    </div>
                                    
                                </button>
                            )
                        })
                    }
                </div>
                <div  className="measure__choose--product">
                    {
                        listTryProduct && listTryProduct.map((item, index)=>{
                            return(
                                <div className="measure__choose--it" key={index}>
                                    <img src={item.url} alt="product" 
                                        className={` ${index === selectedIndexProduct ? 'product--selected' : ''}`}
                                        onClick={()=>{ setSelectedIndexProduct(index) }} 
                                    />
                                    <div>
                                        <small>{item.price} USD</small>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
                <div className="measure__swear--suit">
                    <img src={listTryProduct[selectedIndexProduct].testAttire} alt="try-product" />
                </div>
                <div>
                    <p>{listTryProduct[selectedIndexProduct].material}</p>
                    <p>{listTryProduct[selectedIndexProduct].price} USD</p>
                </div>
            </div>
        </div>
    )
}

export default Measure;