import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlickitySlider from 'react-flickity-component';

import { getAllGames } from '../../services/gameService';
import { getAllConsoles } from '../../services/consoleService';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

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

export default Products;
