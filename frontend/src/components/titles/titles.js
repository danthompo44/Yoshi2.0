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
        <div className="blog-page-title">
            <h1>Gamer's United</h1>
            <h4>Supporting Introverts Worldwide</h4>
        </div>
    );
}

function BlogEntryTitle({blog}) {
    return (
        <div className="blog-page-title">
            <h1>{blog.title}</h1>
            <h4>{blog.subtitle}</h4>
        </div>
    );
}

export { Title, BlogPageTitle, BlogEntryTitle };
