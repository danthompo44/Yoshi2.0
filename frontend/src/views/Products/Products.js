import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlickitySlider from 'react-flickity-component';

import { getTop5Games } from '../../services/gameService';
import { getTop5Consoles } from '../../services/consoleService';

import useFetchData from '../../hooks/useFetchData';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

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

export default Products;
