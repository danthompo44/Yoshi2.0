import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FlickitySlider from 'react-flickity-component';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';
import consoleData from '../../data/products/consoles';

import './flickity.css';
import './Products.css';
import Axios from 'axios';

function Products() {
    const [gamesLoading, setGamesLoading] = useState(true);
    const [games, setGames] = useState([]);

    const [consolesLoading, setConsolesLoading] = useState(false);
    const [consoles, setConsoles] = useState(consoleData);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setGamesLoading(true);
                const games = await Axios.get(
                    'http://localhost:3000/api/games'
                );
                setGames(games.data);
                console.log(games.data);
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
                    <Carousel items={consoles} route="/consoles" />
                )}
            </div>
            <div className="top-x-wrapper">
                <Title title="Top 5 Games" />
                {!gamesLoading && <Carousel items={games} route="/games" />}
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
    let link = '/products/' + route + item.id;
    return (
        <Link to={link} className="carousel-cell">
            <img src={item.image} alt={item.alt} />
            <div className="carousel-cell-bottom-bar">
                <p>{item.title}</p>
                <div className="bottom-bar-rating">
                    <FilledHeart />
                    <UnfilledHeart />
                </div>
            </div>
        </Link>
    );
}

export default Products;
