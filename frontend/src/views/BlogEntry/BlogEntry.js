import React from 'react';
import { BlogEntryTitle } from '../../components/titles/titles';
import { CommentInputWithLabel } from '../../components/inputField/inputFieldWithLabel';
import './BlogEntry.css';
import { skate4Blog } from '../../data/mockBlogs';

function BlogEntry() {
    return (
        <div className="page-wrapper">
            <BlogEntryTitle />
            <BlogEntryContent />
            <Comments />
            <AddComment />
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

function Comments() {
    return skate4Blog.comments.map((item, index) => {
        return <BlogComment key={index} item={item} />;
    });
}

function BlogComment({ item }) {
    return (
        <div class="blog-comment">
            <p class="blog-comment-text">{item}</p>
        </div>
    );
}

function AddComment() {
    return (
        <div id="blog-add-comment">
            <CommentInputWithLabel
            // name="comment"
            // labelContent="Add Comment:"
            // icon="fas fa-comment"
            // inputType="text"
            // placeholder="Add a comment"
            />
            {/* <label for="comment">Add Comment:</label>
                <i class="fas fa-comment input-icon"></i>
                <input
                    class="form-input light with-icon"
                    type="text"
                    name="comment"
                    placeholder="Add a comment"
                    required="true"
                    id="comment"
                /> */}
            <div class="inline-button-wrapper blog-btn-wrapper">
                <button class="btn-green">Add Comment</button>
            </div>
        </div>
    );
}
export default BlogEntry;
