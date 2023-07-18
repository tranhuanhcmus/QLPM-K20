import React from "react";
import { Link } from "react-router-dom";

const TextHoverDropdown = ({ title, listContent }) => {
  return (
    <>
      <style>{styles}</style>
      <div className="text-dropdown">
        <span className="text">{title}</span>
        <div className="dropdown-content">
          {listContent && listContent.map((item, index) => {
            return <Link to="#" key={index}>{item}</Link>;
          })}
        </div>
      </div>
    </>
  );
};

export default TextHoverDropdown;

const styles = `
.text-dropdown {
  position: relative;
  display: inline-block;
}

.text {
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  padding: 10px;
  z-index: 1;
}

.text-dropdown:hover .dropdown-content {
  display: block;
}
`;
