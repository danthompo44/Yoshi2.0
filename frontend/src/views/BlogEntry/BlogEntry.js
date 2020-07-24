import React from 'react';
import { BlogEntryTitle } from '../../components/titles/titles';
import './BlogEntry.css';
import { skate4Blog } from '../../data/mockBlogs';

function BlogEntry() {
    return (
        <div className="page-wrapper">
            <BlogEntryTitle />
            <BlogEntryContent />
            <BlogComments />
        </div>
    );
}

function BlogEntryContent() {
    return (
        <div class="blog-entry-content-container">
            <TextSection />
            <Image />
            <TextSection />
            <VideoSection />
        </div>
    );
}

function TextSection() {
    return (
        <div class="blog-entry-section">
            <p>{skate4Blog.blogText}</p>
        </div>
    );
}

function Image() {
    return (
        <div class="blog-entry-section">
            <div class="blog-entry-image">
                <img
                    src={skate4Blog.blogImage.src}
                    alt={skate4Blog.blogImage.alt}
                />
            </div>
        </div>
    );
}

function VideoSection() {
    return (
        <div class="blog-entry-section">
            <div class="blog-entry-video">
                <iframe
                    title="Blog Entry YouTube Video"
                    src={skate4Blog.blogVideo}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
}

function BlogComments() {
    return (
        <div class="blog-comment">
            <p class="blog-comment-text"></p>
        </div>
    );
}
export default BlogEntry;
