import React from "react";
import {footerLink, footerContact} from "../../assets/constant/index";
import logoImage from "../../assets/images/logos/sc-non.png";
import "../../assets/styles/footer.scss"

const Footer = () => {
  return (
    <footer className="footer-container"> 
      <ul className="ft-link">
          {
            footerLink &&
            footerLink.map((item, index) => {
              return (
                <li key={index} className="ft-link-item">
                  <h6 className="ft-link-tt">{item.title}</h6>
                  {
                      item?.listLink && item?.listLink.map((childItem, childIndex)=>{
                          return(
                              <small key={childIndex} className="ft-link-it">
                                  {childItem}
                              </small>
                          )
                      })
                  }
                </li>
              );
            })
          } 
        <li>
          <h6 className="ft-link-tt">RECEIVE OUR NEWSLETTER</h6>
          <i className="fi fi-brands-facebook"/>
          <i className="fi fi-brands-instagram"/>
          <i className="fi fi-brands-twitter"/>
        </li>
      </ul>
   
      <ul className="ft-contact">
        <li>
          <img src={logoImage} alt="logo" className="ft-contact-logo"/>
        </li>
        
        {
          footerContact && footerContact.map((item, index)=>{
            return(
              <li key={index} className="ft-contact-mn">
                <h6 className="ft-contact-tt">{item.title}</h6>
                { item.icon } 
                <small className="ft-contact-it"> {item.content}</small>
              </li>
            )
          })
        }
      </ul>
      <div className="ft-copyright">
        <p>© Copyright All right reserved A DONG SILK</p>
      </div>
    </footer>
  );
};

export default Footer;
