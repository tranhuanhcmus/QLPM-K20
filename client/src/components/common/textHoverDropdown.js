import React from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/common/navDropdown.scss';

const TextHoverDropdown = ({ title, listContent }) => {
  return (
    <>
      <div className="text-dropdown">
        <span className="text">{title}</span>
        {/* <div className="dropdown-content">
          {listContent && listContent.map((item, index) => {
            return (
              <div className="dropdown-item">
                <Link to="#" key={index}>{item}</Link>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default TextHoverDropdown;

