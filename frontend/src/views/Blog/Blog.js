import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../../components/search-bar/search-bar';
import RoundedButton from '../../components/roundedButton/roundedButton';
import { BlogPageTitle } from '../../components/titles/titles';
import { ps5Blog, skate4Blog } from '../../data/mockBlogs';

import './Blog.css';

function Blog() {
    return (
        <div id="blog-page-wrapper">
            <BlogPageTitle />
            <SearchBar />
            <BlogEntry blog={ps5Blog} />
            <BlogEntry blog={skate4Blog} />
            <RoundedButton content="SHOW MORE" />
        </div>
    );
}

function BlogEntry({ blog }) {
    let link = '/blog/' + blog.id;
    return (
        <Link to={link} className="blog-entry">
            <div className="blog-entry-container">
                <div className="blog-image">
                    <img alt={blog.blogImage.alt} src={blog.blogImage.src} />
                </div>
                <div className="blog-content">
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-text">{blog.blogText}</p>
                </div>
            </div>
        </Link>
    );
}

export default Blog;
