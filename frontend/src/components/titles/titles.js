import React from 'react';
import './titles.css';

function Title(props) {
    return (
        <div className="page-title center">
            <h1>{props.title}</h1>
        </div>
    );
}

function BlogPageTitle() {
    return (
        <div class="blog-page-title">
            <h1>Gamer's United</h1>
            <h4>Supporting Introverts Worldwide</h4>
        </div>
    );
}

function BlogEntryTitle() {
    return (
        <div class="blog-page-title">
            <h1>PS5 Set To Annoys Gamers Worldwide</h1>
        </div>
    );
}

export { Title, BlogPageTitle, BlogEntryTitle };
