import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlickitySlider from 'react-flickity-component';

import { getAllGames } from '../../services/gameService';
import { getAllConsoles } from '../../services/consoleService';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';
import SearchBar from '../../components/search-bar/search-bar';

import './flickity.css';
import './Products.css';

function Products() {
    const [gamesLoading, setGamesLoading] = useState(true);
    const [games, setGames] = useState([]);

    const [consolesLoading, setConsolesLoading] = useState(false);
    const [consoles, setConsoles] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setGamesLoading(true);
                const gameData = await getAllGames();
                setGames(gameData.data);
                setGamesLoading(false);
            } catch (err) {
                setGamesLoading(false);
                console.log(err);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const fetchConsoles = async () => {
            try {
                setConsolesLoading(true);
                const consoleData = await getAllConsoles();
                setConsoles(consoleData.data);
                setConsolesLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchConsoles();
    }, []);

    return (
        <>
            <div className="top-x-wrapper">
                <Title title="Top 5 Consoles" />
                {!consolesLoading && (
                    <Carousel items={consoles} route="/consoles/" />
                )}
            </div>
            <div className="top-x-wrapper">
                <Title title="Top 5 Games" />
                {!gamesLoading && <Carousel items={games} route="/games/" />}
            </div>
            <BottomContainer/>
        </>
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
    const link = '/products' + route + item.id;

    function displayRating() {
        const hearts = [];
        for (let index = 0; index < 5; index++) {
            if (item.rating > index) {
                hearts.push(<FilledHeart key={index} />);
            } else {
                hearts.push(<UnfilledHeart key={index} />);
            }
        }
        return hearts;
    }

    return (
        <Link to={link} className="carousel-cell">
            <img
                src={item.image_url}
                alt={`${item.title || item.name} in action`}
            />
            <div className="carousel-cell-bottom-bar">
                <p>{item.title || item.name}</p>
                <div className="bottom-bar-rating">{displayRating()}</div>
            </div>
        </Link>
    );
}
function BottomContainer({products}) {
    return (      
        <div class="all-products-wrapper">
        <div class="page-title" id="all-products-title">
            <Title title= "All Products" />
        </div>
        <div class="top-filters-section">
            <form id="filters-form">
                <SelectBox option1= "PS4" option2= "xbox" option3= "snez"/>
                <div id="input-div">
                <SearchBar />
                </div>
            </form>
        </div>
        <div class="products-list-wrapper">
        <ProductAtBottom/>
        <PageNumberChanger/>
    </div>
</div>




    )
}


function SelectBox({option1, option2, option3}) {
    return (
        <div class="select-div">
                    <select>
                        <option selected>Options</option>
                        <option>{option1}</option>
                        <option>{option2}</option>
                        <option>{option3}</option>
                    </select>
                    <div class="arrow-container">
                        <i class="fas fa-sort-down down-arrow"></i>
                    </div>
                </div>
    )

}

function ProductAtBottom() {
    return (
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
    )
}

function PageNumberChanger() {
    return (
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
    )
}

export default Products;
