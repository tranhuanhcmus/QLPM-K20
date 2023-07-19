import React, { useState, useEffect } from 'react';
import '../../assets/styles/home.scss';

import aboutImg from '../../assets/images/graphics/about-img.png';
import lineIcon from '../../assets/images/graphics/review-decor.png';

import {
    steps,
    banners,
    reviews,
    customOptions
} from './HomeData';
import { URLS } from '../../constants/urls';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const navigator = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((currentBanner + 1) % banners.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [currentBanner]);

    return (

        <main className='home'>
            <section className='home__intro'>
                <div className="intro__slider">
                    {banners.map((banner, index) => (
                        <img
                            key={index}
                            className={`banner-image ${currentBanner === index ? 'active' : ''}`}
                            src={banner}
                            alt={`intro-banner-${index}`}
                        />
                    ))}
                </div>
                <div className="intro__list">
                    {customOptions.map((customOption, index) => (
                        <button className="intro__custom-option">
                            <div className="custom-option__label left">
                                <p>{customOption.subTitle}</p>
                                <p>{customOption.title}</p>
                            </div>
                            <p className="custom-option__alternative-label">
                                {customOption.title}
                            </p>
                            <div className="custom-option__overlay"></div>
                            <img
                                src={customOption.image}
                                alt={`custom-option-${index}`}
                            />
                        </button>
                    ))}
                </div>
            </section>
            <section className='home__steps'>
                <div className="container">
                    <div className="title-template">
                        <h2><span>03</span><br/>SIMPLE STEP</h2>
                        <hr />
                    </div>
                    <div className="steps__list">
                        {steps.map((step, index) => (
                            <div className="steps-list__step">
                                <img
                                    key={`step-${index}`}
                                    src={step.icon}
                                    alt={`step-${index}`}
                                />
                                <h6>{step.title}</h6>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => {navigator(URLS.MEASURE)}}>Get start</button>
                </div>
            </section>
            <section className='home__short-about'>
                <div className="container">
                    <div className="title-template">
                        <h2><span>ABOUT</span><br/>SUNRISE SUIT</h2>
                        <hr />
                    </div>
                    <div className="short-about__main">
                        <p className="short-about__description">
                        "<b>Personal Elegance</b>" is a bespoke tailoring service that crafts, designs, and sews exquisite garments according to the precise preferences of our esteemed customers. Embracing the essence of personalization, we empower our clients to handpick their preferred fabric, style, and color, ensuring a seamless blend of attire and personality. Our in-house artisans meticulously engage in <b>personal tailoring</b>, achieving an exceptional level of customization and customer involvement.<br/><br/>

    Founded in 1997, <b>Sunrise Suit</b> stands as a trailblazer in the realm of bespoke <b>personal tailoring</b> in Vietnam. We have garnered a global reputation for curating contemporary, fashionable, and top-tier garments that perfectly complement every body shape.<br/><br/>

    Drawing from a 50-year heritage of haute couture in the historic city of Hoi An, renowned for its silk weaving craftsmanship that spans over four centuries, <b>Sunrise Suit</b> embodies the spirit of a "craftsmanship nation," epitomizing the serenity and time-honored hospitality of Vietnam's beauty.<br/><br/>

    The revolutionary 10-minute measurement process at <b>Sunrise Suit</b> ensures ease and comfort for our valued clients. Meticulously hand-sewn by our skilled artisans, our garments can be ready for collection within two days at any of our stores, and within one week, they can grace any destination worldwide.<br/><br/>
                        </p>
                        <div className="short-about__img">
                            <img src={aboutImg} alt="aboutImg" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="home__review">
                <div className="container">
                    <div className="home__custom-line">
                        <img src={lineIcon} alt="lineIcon" />
                    </div>
                    <div className="title-template">
                        <h2><span>REVIEWS</span><br/>TRIPADVISOR</h2>
                        <hr />
                    </div>

                    <div className="home__review-list">
                        {reviews.slice(0, 6).map((review, index) => (
                            <div className="review-list__item" key={index}>
                                <div className="item__avatar-container">
                                    <div className="item__avatar">
                                        <img src={review.avatar} alt={`review-avatar-${index}`} />
                                    </div>
                                    <p>{review.name}</p>
                                </div>
                                <div className="item__content">
                                    <div className="item__rating">
                                        {Array(review.rating).fill().map((_, i) => (
                                            <span key={i} className="rating__star">&#9733;</span>
                                        ))}
                                    </div>
                                    <h6>{review.title}</h6>
                                    <p>{review.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="home__custom-line">
                        <img src={lineIcon} alt="lineIcon" />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
