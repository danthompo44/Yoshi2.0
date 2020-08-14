import React from 'react';
import { Link } from 'react-router-dom';

import { getAllBlogs } from '../../services/blogService';

import SearchBar from '../../components/search-bar/search-bar';
import RoundedButton from '../../components/roundedButton/roundedButton';
import { BlogPageTitle } from '../../components/titles/titles';

import './Blog.css';
import useFetchData from '../../hooks/useFetchData';

function Blog() {
    const [{ value: loadingBlogs }, { value: blogs }] = useFetchData(
        getAllBlogs
    );

    return (
        <div id="blog-page-wrapper">
            <BlogPageTitle blogs={blogs} />
            <SearchBar />
            {!loadingBlogs && (
                <div id="blog-entries-wrapper">
                    {blogs.map((blog, index) => (
                        <BlogEntry blog={blog} key={index} />
                    ))}
                </div>
            )}
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
                    <img alt={blog.img_alt} src={blog.img_src} />
                </div>
                <div className="blog-content">
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-text">{blog.subtitle}</p>
                </div>
            </div>
        </Link>
    );
}

export default Blog;
