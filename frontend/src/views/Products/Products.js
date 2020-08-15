import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FlickitySlider from 'react-flickity-component';

import { getTop5Games, getAllGames } from '../../services/gameService';
import { getTop5Consoles, getAllConsoles } from '../../services/consoleService';

import useFetchData from '../../hooks/useFetchData';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';
import SearchBar from '../../components/search-bar/search-bar';

import './flickity.css';
import './Products.css';

function Products() {
    const [{ value: gamesLoading }, { value: games }] = useFetchData(
        getTop5Games
    );
    const [{ value: consolesLoading }, { value: consoles }] = useFetchData(
        getTop5Consoles
    );

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
            <BottomContainer />
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
            reloadOnUpdate={true}
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

    return (
        <Link to={link} className="carousel-cell">
            <img
                src={item.image_url}
                alt={`${item.title || item.name} in action`}
            />
            <div className="carousel-cell-bottom-bar">
                <p>{item.title || item.name}</p>
                <div className="bottom-bar-rating">
                    <DisplayRating rating={item.rating} />
                </div>
            </div>
        </Link>
    );
}

function DisplayRating({ rating }) {
    const hearts = [];
    for (let index = 0; index < 5; index++) {
        if (rating > index) {
            hearts.push(<FilledHeart key={index} />);
        } else {
            hearts.push(<UnfilledHeart key={index} />);
        }
    }
    return hearts;
}

function BottomContainer() {
    const options = { ALL: 'ALL', GAMES: 'GAMES', CONSOLES: 'CONSOLES' };
    const [type, setType] = useState(options.ALL);

    function changeType(event) {
        setType(options[event.target.value]);
    }

    return (
        <div className="all-products-wrapper">
            <div className="page-title" id="all-products-title">
                <Title title="All Products" />
            </div>
            <div className="top-filters-section">
                <SelectBox
                    value={type}
                    onChange={changeType}
                    options={options}
                />

                <SearchBar />
            </div>
            {(type === options.ALL || type === options.GAMES) && (
                <AllGamesContainer />
            )}
            {(type === options.ALL || type === options.CONSOLES) && (
                <AllConsolesContainer />
            )}
        </div>
    );
}

function SelectBox({ value, onChange, options }) {
    return (
        <div className="product-options-select">
            <select value={value} onChange={onChange}>
                {Object.keys(options).map((item, index) => (
                    <option value={item} label={item} key={index} />
                ))}
            </select>
            <div className="arrow-container">
                <i className="fas fa-sort-down down-arrow"></i>
            </div>
        </div>
    );
}

function AllGamesContainer() {
    const [{ value: gamesLoading }, { value: games }] = useFetchData(
        getAllGames
    );
    return (
        <>
            <h2 className="bottom-product-title">Games</h2>
            {!gamesLoading && (
                <div className="products-list-wrapper">
                    {games.map((game, index) => (
                        <ProductCard
                            product={game}
                            key={index}
                            route="/games/"
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function AllConsolesContainer() {
    const [{ value: consolesLoading }, { value: consoles }] = useFetchData(
        getAllConsoles
    );
    return (
        <>
            <h2 className="bottom-product-title">Consoles</h2>
            {!consolesLoading && (
                <div className="products-list-wrapper">
                    {consoles.map((console, index) => (
                        <ProductCard
                            product={console}
                            key={index}
                            route="/consoles/"
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function ProductCard({ product, route }) {
    const link = '/products' + route + product.id;

    return (
        <div className="individual-product">
            <Link to={link}>
                <div className="product-details">
                    <h3>{product.title || product.name}</h3>
                    <div className="product-rating-container">
                        <DisplayRating rating={product.rating} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Products;
