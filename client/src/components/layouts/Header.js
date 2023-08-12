import React from 'react';
import "../../assets/styles/header.scss";
import logoImage from "../../assets/images/logos/sc-non.png";
import TextHoverDropdown from '../common/textHoverDropdown';
import { Link } from 'react-router-dom';
import { listTextContentHeader } from '../../assets/constant';
import { URLS } from '../../constants/urls';

const Header = () => {

    return (
        <header className='header'>
            <div className='header__user-interact ' >
                <div className='user-interact__language'>
                    {/* Nên tự viết select dropdown, không sài default khó style */}
                    <button className="">Language</button>
                    <select>
                        <option value="en">English</option>
                        <option value="fr">Viet Nam</option>
                    </select>
                </div> 
                <Link to="#">  How to Order</Link>
                <Link to="/measure">How to measure</Link> 
                <Link to={URLS.AUTHEN}>My account</Link>
            </div>

            <div className=' header__user-select-nav ' >  
                <ul className='header__user-select-product'>
                    <Link to={URLS.HOME_PAGE}>
                        <img src={logoImage} alt="Logo" className='header__logo'/>
                    </Link>
                    {
                        listTextContentHeader && listTextContentHeader.map((item, index)=>{
                            return  (
                                <div key={index}>   
                                   <Link to ={URLS.COAT}> <TextHoverDropdown title={item.title} listContent={item.listContent} />   </Link>
                                </div>
                            )
                        })
                    }
                   
                </ul> 
            </div>

        </header>
    );
}

export default Header;
