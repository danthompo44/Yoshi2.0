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
            {BlogEntry(ps5Blog)}
            {BlogEntry(skate4Blog)}
            <RoundedButton content="SHOW MORE" />
        </div>
    );
}

function BlogEntry(blog) {
    let link = '/blog/' + blog.id;
    return (
        <Link to={link} className="blog-entry">
            <div class="blog-entry-container">
                <div class="blog-image">
                    <img alt={blog.blogImage.alt} src={blog.blogImage.src} />
                </div>
                <div class="blog-content">
                    <h2 class="blog-title">{blog.title}</h2>
                    <p class="blog-text">{blog.blogText}</p>
                </div>
            </div>
        </Link>
    );
}

export default Blog;
