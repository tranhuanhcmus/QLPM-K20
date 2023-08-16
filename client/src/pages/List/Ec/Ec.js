import { useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/styles/coat.scss";
import { convertNumberToCurrency } from '../../../utils/helpers/MoneyConverter'
import { coatCollection, blazersCollection, suits1Collection, suits2Collection, tailoredSuitsCollection, tiesCollection } from "../data";
const Ec = () => {


    const [selectedCategory, setSelectedCategory] = useState(coatCollection)
    const [productList, setProductList] = useState('product-list-coat')
    const [typeProduct, setTypeProduct] = useState('COAT')
    const [showListPageSuits, setShowListPageSuits] = useState(false);
    const [showListPageMen, setShowListPageMen] = useState(false);
    const [currentPageMen, setCurrentPageMen] = useState(1);


    const handleBlazer = () => {
        setSelectedCategory(blazersCollection)
        setProductList('product-list-blazers')
        setTypeProduct('BLAZER')
        setShowListPageMen(false);
        setShowListPageSuits(false);
    }
    const handleCoat = () => {
        setSelectedCategory(coatCollection)
        setProductList('product-list-coat')
        setTypeProduct('COAT')
        setShowListPageMen(false);
        setShowListPageSuits(false);
    }
    const handleSuits1Data = () => {
        setSelectedCategory(suits1Collection)
        setProductList('product-list-suits')
        setTypeProduct('SUIT')
        setShowListPageMen(false);
        setShowListPageSuits(true);
    }
    const handleSuits2Data = () => {
        setSelectedCategory(suits2Collection)
        setProductList('product-list-suits')
        setTypeProduct('SUIT')
        setShowListPageMen(false);
        setShowListPageSuits(true);
    }
    const handleTailored = () => {
        setSelectedCategory(tailoredSuitsCollection)
        setProductList('product-list-coat')
        setTypeProduct('TAILORED')
        setShowListPageMen(false)

        setShowListPageSuits(false);
    }
    const handleTies = () => {
        setSelectedCategory(tiesCollection)
        setProductList('product-list-blazers')
        setTypeProduct('TIE')
        setShowListPageMen(false)
        setShowListPageSuits(false);

    }
    const handleMen = () => {
        setSelectedCategory([...suits1Collection, ...suits2Collection, ...coatCollection, ...blazersCollection]);
        setProductList('product-list-suits');
        setTypeProduct('MEN')
        setShowListPageMen(true)
        setShowListPageSuits(false);
    }
    const handleMenPage = (page) => {
        setCurrentPageMen(page);
    }
    const menPerPage = 20;
    const indexOfLastMen = currentPageMen * menPerPage;
    const indexOfFirstMen = indexOfLastMen - menPerPage;
    const menItemsToShow = selectedCategory.slice(indexOfFirstMen, indexOfLastMen);

    return (
        <main >
            <div className="product-page container">
                <div className="category-list">
                    <div className="title">
                        <h2 className="title-template">MEN COLLECTION</h2>
                    </div>
                    <ul >
                        <button onClick={handleMen}><h>MEN</h></button>
                        <li>
                            <button onClick={handleSuits1Data}><h>SUITS</h></button>
                        </li>
                        <li>
                            <button onClick={handleBlazer}><h>BLAZERS</h></button>
                        </li> <li>
                            <button onClick={handleCoat} ><h>COAT</h></button>
                        </li>
                    </ul>

                    <ul >
                        <button onClick={handleTailored}><h>WEDDING</h></button>
                        <li >
                            <button onClick={handleTailored}> <h>Tailored Suits for Groom and Groomsmen</h> </button>
                        </li>
                    </ul>

                    <ul >
                        <button onClick={handleTies}><h>ACCESSORIES</h></button>
                        <li >
                            <button onClick={handleTies}><h>TIES</h></button>
                        </li>
                    </ul>
                </div>
                <div className={productList}>
                    {showListPageMen ? menItemsToShow.map((item, index) => (
                        <div className='product-list__item' key={index}>
                            <Link to={item.index}><img src={item.img}></img></Link>
                            <div className='name-alt'>{typeProduct}</div>
                            <div className='name'>{item.code}</div>
                            <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
                            <div className='buttons-coat'>
                                <button><i className="fi fi-rr-heart"></i></button>
                                <button><i className="fi fi-rr-add"></i></button>
                            </div>
                        </div>
                    ))
                        : selectedCategory.map((item, index) => (
                            <div className='product-list__item' key={index}>
                                <Link to={item.index}><img src={item.img}></img></Link>
                                <div className='name-alt'>{typeProduct}</div>
                                <div className='name'>{item.code}</div>
                                <div className='price'>From <span>{convertNumberToCurrency('usd', item.price)}</span></div>
                                <div className='buttons-coat'>
                                    <button><i className="fi fi-rr-heart"></i></button>
                                    <button><i className="fi fi-rr-add"></i></button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {showListPageMen && (
                <div className="list-page">
                    <ul>
                        {[...Array(Math.ceil(selectedCategory.length / menPerPage)).keys()].map(
                            (pageNumber) => (
                                <li key={pageNumber}>
                                    <button onClick={() => handleMenPage(pageNumber + 1)}>
                                        <p>{pageNumber + 1}</p>
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                    <ul>
                        <li>
                            <button onClick={() => handleMenPage(currentPageMen - 1)}><i className='fi fi-rr-arrow-left'></i></button>
                        </li>
                        <li>
                            <button onClick={() => handleMenPage(currentPageMen + 1)}><i className='fi fi-rr-arrow-right'></i></button>
                        </li>
                    </ul>
                </div>
            )}
            {showListPageSuits && (
                <div className="list-page">
                    <ul>
                        <li><button onClick={handleSuits1Data}><p>1</p></button></li>
                        <li><button onClick={handleSuits2Data}><p>2</p></button></li>
                       
                    </ul>
                </div>
            )}

        </main>
    )

}


export default Ec;