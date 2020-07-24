import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlickitySlider from 'react-flickity-component';

import Title from '../../components/title/title';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

import './flickity.css';
import './Products.css';

function Products() {
    return (
        <div className="top-x-wrapper">
            <Title title="Top 5 Consoles" />
            <Carousel items={consoles} route="/consoles" />
        </div>
    );
}

const flickityOptions = {
    initialIndex: 2,
    freeScroll: true,
    wrapAround: true,
};

function Carousel({ items, route }) {
    const flickityRef = useRef();

    useEffect(() => {
        if (flickityRef) {
            // resets height via ref as does not render to 500px as it should
            flickityRef.current.flkty.viewport.style.height = '500px';
        }
    }, []);

    return (
        <FlickitySlider
            className={'main-carousel'}
            options={flickityOptions}
            ref={flickityRef}
        >
            {items.map((item, index) => {
                return <CarouselItem key={index} item={item} route={route} />;
            })}
        </FlickitySlider>
    );
}

function CarouselItem({ item, route }) {
    let link = '/products/' + route + item.id;
    return (
        <Link to={link} className="carousel-cell">
            <img src={item.image} alt={item.alt} />
            <div className="carousel-cell-bottom-bar">
                <p>{item.name}</p>
                <div className="bottom-bar-rating">
                    <FilledHeart />
                    <UnfilledHeart />
                </div>
            </div>
        </Link>
    );
}

//create heart icons with different colours dependent on the rating passed to the method
// function createHeartRating(rating) {
//     let html = [];
//     let totalHearts = 5;
//     for (let i = 0; i < rating; i++) {
//         //create coloured hearts while less than rating
//         html.push(<FilledHeart />);
//     }
//     for (let i = 6 - rating; i < totalHearts; i++) {
//         //create empty hearts while less than array index, start at totalhearts - rating
//         html.push(<UnfilledHeart />);
//     }
//     return html;
// }

// function Carousel(console) {
//     return (
//         <div
//             className="main-carousel"
//             data-flickity='{
//                         "freeScroll": true,
//                         "wrapAround": true
//                     }'
//         >
//             {console.map((item) => {
//                 return CarouselItem(item);
//             })}
//             {/* {(() => {
//                 const itemArray = [];

//                 for (let i = 0; i < items.length; i++) {
//                     itemArray.push({CarouselItem(items[i])});
//                 }

//                 return itemArray;
//             })()} */}
//             {CarouselItem(console)}
//         </div>
//     );
// }

export default Products;
/* <div
                    className="main-carousel"
                    data-flickity='{
                        "freeScroll": true,
                        "wrapAround": true 
                    }'
                >
                    <% consoles.consoles.forEach(console => { %>
                    <a
                        href="/products/consoles/<%- console.id %>"
                        className="carousel-cell"
                    >
                        <img
                            src="<%- console.image.src %>"
                            alt="<%- console.image.alt %> "
                        />
                        <div className="carousel-cell-bottom-bar">
                            <p><%- console.name %></p>
                            <div className="bottom-bar-rating">
                                <% for( let index = 0; index < 5; index++ ) { %>
                                <% if (index < console.stats.averageRating) { %>
                                <i className="fas fa-heart filled"></i>
                                <% } else { %>
                                <i className="fas fa-heart"></i>
                                <% } %> <% } %>
                            </div>
                        </div>
                    </a>
                    <% }) %>
                </div>
            </div>

            <div className="top-x-wrapper">
                <h1 className="title">Top 5 Games</h1>
                <div
                    className="main-carousel"
                    data-flickity='{
                        "freeScroll": true,
                        "wrapAround": true,
                        "adaptiveHeight": true
                    }'
                >
                    <% games.games.forEach(game => { %>
                    <a
                        href="/products/games/<%- game.id %>"
                        className="carousel-cell"
                    >
                        <img
                            src="<%- game.image.src %>"
                            alt="<%- game.image.alt %> "
                        />
                        <div className="carousel-cell-bottom-bar">
                            <p><%- game.name %></p>
                            <div className="bottom-bar-rating">
                                <% for( let index = 0; index < 5; index++ ) { %>
                                <% if (index < game.stats.averageRating) { %>
                                <i className="fas fa-heart filled"></i>
                                <% } else { %>
                                <i className="fas fa-heart"></i>
                                <% } %> <% } %>
                            </div>
                        </div>
                    </a>
                    <% }) %>
                </div>
            </div>
            <div className="all-products-wrapper">
                <div className="page-title" id="all-products-title">
                    <h1>All Products</h1>
                </div>
                <div className="top-filters-section">
                    <form id="filters-form">
                        <div className="select-div">
                            <select>
                                <option selected>Options</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div className="arrow-container">
                                <i className="fas fa-sort-down down-arrow"></i>
                            </div>
                        </div>
                        <div id="input-div">
                            <i className="fas fa-search input-icon"></i>
                            <input type="text" placeholder="Search..." />
                        </div>
                    </form>
                </div>
                <div className="products-list-wrapper">
                    <div className="individual-product">
                        <div className="product-details">
                            <h2>Product Name 1</h2>
                            <p>Product Description 1 will be inserted here</p>
                        </div>
                        <div className="product-heart-rating">
                            <i className="fas fa-heart spacing green"></i>
                            <i className="fas fa-heart spacing green"></i>
                            <i className="fas fa-heart spacing green"></i>
                            <i className="fas fa-heart spacing green"></i>
                            <i className="fas fa-heart spacing"></i>
                        </div>
                    </div>
                    <div className="individual-product">
                        <div className="product-details">
                            <h2>Product Name 2</h2>
                            <p>Product Description 2 will be inserted here</p>
                        </div>
                        <div className="product-heart-rating">
                            <i className="fas fa-heart spacing green"></i>
                            <i className="fas fa-heart spacing green"></i>
                            <i className="fas fa-heart spacing"></i>
                            <i className="fas fa-heart spacing"></i>
                            <i className="fas fa-heart spacing"></i>
                        </div>
                    </div>
                    <div className="page-numbers-wrapper">
                        <div className="page-numbers-container">
                            <div className="page-number">
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className="page-number">
                                <p>1</p>
                            </div>
                            <div className="page-number selected-page-number">
                                <p>2</p>
                            </div>
                            <div className="page-number">
                                <p>3</p>
                            </div>
                            <div className="page-number">
                                <i className="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div> */
// }
