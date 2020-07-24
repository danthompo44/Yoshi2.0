import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../../components/search-bar/search-bar';
import RoundedButton from '../../components/roundedButton/roundedButton';

import './Blog.css';

function Blog() {
    return (
        <div id="blog-page-wrapper">
            {BlogPageTitle()}
            <SearchBar />
            {BlogEntry('Pewdiepie, Narcassist', 'Some Text For the Blog')}
            {BlogEntry(
                'PS5 Set To Annoy Gamers Worldwide',
                'Some Other Text For the Blog'
            )}
            <RoundedButton content="SHOW MORE" />
        </div>
    );
}

function BlogPageTitle() {
    return (
        <div className="blog-page-title">
            <h1>Gamer's United</h1>
            <h4>Supporting Introverts Worldwide</h4>
        </div>
    );
}

function BlogEntry(title, description) {
    return (
        <Link to="/blog/1" className="blog-entry">
            <div className="blog-entry-container">
                <div className="blog-image">
                    <img
                        alt="Insert Alt"
                        src="https://cdn.vox-cdn.com/thumbor/x8pw9O_UdeENcbV0kuZxfkKUgkE=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/66927028/image.0.png"
                    />
                </div>
                <div className="blog-content">
                    <h2 className="blog-title">{title}</h2>
                    <p className="blog-text">{description}</p>
                </div>
            </div>
        </Link>
    );
}

export default Blog;
