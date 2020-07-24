import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/title/title';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';
import './flickity.css';
import './Products.css';

import consoles from '../../data/blogs/consoles';

function Products() {
    return (
        <div class="top-x-wrapper">
            <Title title="Top 5 Consoles" />
            {DemoCarousel()}
        </div>
    );
}

const flickityOptions = {
    freeScroll: true,
    wrapAround: true,
    imagesLoaded: true,
};

// function Carousel(items, route) {
//     return (
//         <Flickity
//             className={'main-carousel'} // default ''
//             elementType={'div'} // default 'div'
//             options={flickityOptions} // takes flickity options {}
//             disableImagesLoaded={true} // default false
//         >
//             {items.map((item) => {
//                 return CarouselItem(item, route);
//             })}
//         </Flickity>
//     );
// }

// function CarouselItem(item, route) {
//     let link = '/products/' + route + item.id;
//     return (
//         <Link to={link} className="carousel-cell">
//             <img src={item.image} alt={item.alt} />
//             <div className="carousel-cell-bottom-bar">
//                 <p>{item.name}</p>
//                 <div className="bottom-bar-rating">
//                     {createHeartRating(item.rating)}
//                 </div>
//             </div>
//         </Link>
//     );
// }

// //create heart icons with different colours dependent on the rating passed to the method
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
//             class="main-carousel"
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
                    class="main-carousel"
                    data-flickity='{
                        "freeScroll": true,
                        "wrapAround": true 
                    }'
                >
                    <% consoles.consoles.forEach(console => { %>
                    <a
                        href="/products/consoles/<%- console.id %>"
                        class="carousel-cell"
                    >
                        <img
                            src="<%- console.image.src %>"
                            alt="<%- console.image.alt %> "
                        />
                        <div class="carousel-cell-bottom-bar">
                            <p><%- console.name %></p>
                            <div class="bottom-bar-rating">
                                <% for( let index = 0; index < 5; index++ ) { %>
                                <% if (index < console.stats.averageRating) { %>
                                <i class="fas fa-heart filled"></i>
                                <% } else { %>
                                <i class="fas fa-heart"></i>
                                <% } %> <% } %>
                            </div>
                        </div>
                    </a>
                    <% }) %>
                </div>
            </div>

            <div class="top-x-wrapper">
                <h1 class="title">Top 5 Games</h1>
                <div
                    class="main-carousel"
                    data-flickity='{
                        "freeScroll": true,
                        "wrapAround": true,
                        "adaptiveHeight": true
                    }'
                >
                    <% games.games.forEach(game => { %>
                    <a
                        href="/products/games/<%- game.id %>"
                        class="carousel-cell"
                    >
                        <img
                            src="<%- game.image.src %>"
                            alt="<%- game.image.alt %> "
                        />
                        <div class="carousel-cell-bottom-bar">
                            <p><%- game.name %></p>
                            <div class="bottom-bar-rating">
                                <% for( let index = 0; index < 5; index++ ) { %>
                                <% if (index < game.stats.averageRating) { %>
                                <i class="fas fa-heart filled"></i>
                                <% } else { %>
                                <i class="fas fa-heart"></i>
                                <% } %> <% } %>
                            </div>
                        </div>
                    </a>
                    <% }) %>
                </div>
            </div>
            <div class="all-products-wrapper">
                <div class="page-title" id="all-products-title">
                    <h1>All Products</h1>
                </div>
                <div class="top-filters-section">
                    <form id="filters-form">
                        <div class="select-div">
                            <select>
                                <option selected>Options</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div class="arrow-container">
                                <i class="fas fa-sort-down down-arrow"></i>
                            </div>
                        </div>
                        <div id="input-div">
                            <i class="fas fa-search input-icon"></i>
                            <input type="text" placeholder="Search..." />
                        </div>
                    </form>
                </div>
                <div class="products-list-wrapper">
                    <div class="individual-product">
                        <div class="product-details">
                            <h2>Product Name 1</h2>
                            <p>Product Description 1 will be inserted here</p>
                        </div>
                        <div class="product-heart-rating">
                            <i class="fas fa-heart spacing green"></i>
                            <i class="fas fa-heart spacing green"></i>
                            <i class="fas fa-heart spacing green"></i>
                            <i class="fas fa-heart spacing green"></i>
                            <i class="fas fa-heart spacing"></i>
                        </div>
                    </div>
                    <div class="individual-product">
                        <div class="product-details">
                            <h2>Product Name 2</h2>
                            <p>Product Description 2 will be inserted here</p>
                        </div>
                        <div class="product-heart-rating">
                            <i class="fas fa-heart spacing green"></i>
                            <i class="fas fa-heart spacing green"></i>
                            <i class="fas fa-heart spacing"></i>
                            <i class="fas fa-heart spacing"></i>
                            <i class="fas fa-heart spacing"></i>
                        </div>
                    </div>
                    <div class="page-numbers-wrapper">
                        <div class="page-numbers-container">
                            <div class="page-number">
                                <i class="fas fa-arrow-left"></i>
                            </div>
                            <div class="page-number">
                                <p>1</p>
                            </div>
                            <div class="page-number selected-page-number">
                                <p>2</p>
                            </div>
                            <div class="page-number">
                                <p>3</p>
                            </div>
                            <div class="page-number">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div> */
// }
