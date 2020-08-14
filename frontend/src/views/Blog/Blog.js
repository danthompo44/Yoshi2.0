import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../../components/search-bar/search-bar';
import RoundedButton from '../../components/roundedButton/roundedButton';
import { BlogPageTitle } from '../../components/titles/titles';

import './Blog.css';

import {getAllBlogs} from '../../services/blogService';

function Blog() {
    const [loadingBlogs, setLoadingBlogs] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoadingBlogs(true);
                var blogs = await getAllBlogs();
                setBlogs(blogs.data);
                setLoadingBlogs(false);
            } catch (err) {
                setLoadingBlogs(false);
                console.log(err);
            }
        };
        fetchBlogs();
    }, []);

    var blogEntrys = [];
    for(let i = 0; i <blogs.length; i++){
        blogEntrys.push(!loadingBlogs && <BlogEntry blog={blogs[i]} key={i} />)
    }

    return (
        <div id="blog-page-wrapper">
            <BlogPageTitle blogs = {blogs}/>
            <SearchBar />
            {blogEntrys}
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
                    <h4 className="blog-text">{blog.subtitle}</h4>
                </div>
            </div>
        </Link>
    );
}

export default Blog;
