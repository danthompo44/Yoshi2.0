import React from 'react';
import { Link } from 'react-router-dom';

import { getAllBlogs, searchForBlog } from '../../services/blogService';
import useFetchData from '../../hooks/useFetchData';

import SearchBar from '../../components/search-bar/search-bar';
import { BlogPageTitle } from '../../components/titles/titles';

import './Blog.css';

function Blog() {
    const [{ value: loadingBlogs }, blogs] = useFetchData(getAllBlogs);

    async function search(text) {
        try {
            const searchedBlogs = await searchForBlog(text);
            blogs.update(searchedBlogs.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id="blog-page-wrapper">
            <BlogPageTitle blogs={blogs.value} />
            <SearchBar searchFn={search} />
            {!loadingBlogs && (
                <div id="blog-entries-wrapper">
                    {blogs.value.map((blog, index) => (
                        <BlogEntry blog={blog} key={index} />
                    ))}
                </div>
            )}
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
