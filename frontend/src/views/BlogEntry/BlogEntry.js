import React, { useState, useContext, useCallback } from 'react';

import {
    getBlogById,
    getBlogComments,
    addCommentToBlog,
    likeCommentOnBlog,
} from '../../services/blogService';

import UserContext from '../../state/userContext';
import useFetchData from '../../hooks/useFetchData';

import { BlogEntryTitle } from '../../components/titles/titles';
import { CommentInputWithLabel } from '../../components/inputField/inputFieldWithLabel';

import './BlogEntry.css';

function BlogEntry(props) {
    //retireve paramaters to be used to query the database
    let id = props.match.params.id;

    const blogMethod = useCallback(async () => {
        return await getBlogById(id);
    }, [id]);

    const commentsMethod = useCallback(async () => {
        return await getBlogComments(id);
    }, [id]);

    const [{ value: loadingBlog }, blog] = useFetchData(blogMethod);
    const [loadingComments, comments] = useFetchData(commentsMethod);

    return (
        !loadingBlog && (
            <div className="page-wrapper">
                <BlogEntryTitle blog={blog.value} />
                <BlogEntryContent blog={blog.value} />
                {!loadingComments.value && (
                    <Comments comments={comments} blog={blog.value} />
                )}
                <AddComment comments={comments} blog={blog.value} />
            </div>
        )
    );
}

function BlogEntryContent({ blog }) {
    return (
        <div className="blog-entry-content-container">
            <TextSection content={blog.paragraph_one} />
            <Image src={blog.img_src} al={blog.img_alt} />
            <TextSection content={blog.paragraph_two} />
            <VideoSection src={blog.vid_src} />
        </div>
    );
}

function TextSection({ content }) {
    return (
        <div className="blog-entry-section">
            <p>{content}</p>
        </div>
    );
}

function Image({ src, alt }) {
    return (
        <div className="blog-entry-section">
            <div className="blog-entry-image">
                <img src={src} alt={alt} />
            </div>
        </div>
    );
}

function VideoSection({ src }) {
    return (
        <div className="blog-entry-section">
            <div className="blog-entry-video">
                <iframe
                    title="Blog Entry YouTube Video"
                    src={src}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                ></iframe>
            </div>
        </div>
    );
}

function Comments({ comments, blog }) {
    return (
        <div id="blog-comments">
            {comments.value.map((comment, index) => (
                <BlogComment
                    key={index}
                    comment={comment}
                    comments={comments}
                    blog={blog}
                />
            ))}
        </div>
    );
}

function BlogComment({ comment, comments, blog }) {
    const user = useContext(UserContext);
    const handleLike = () => {
        likeCommentOnBlog(blog.id, comment.id, user.state.token);

        const newComments = [...comments.value];
        const index = newComments.findIndex((c) => c.id === comment.id);
        newComments[index].likes++;

        comments.update(newComments);
        //add restriction to user only vbeing able to like a comment once, shange the text to unlike once clicked
    };
    return (
        <div className="blog-comment">
            <div className="blog-comment-box">
                <p className="blog-comment-text">{comment.comment}</p>
            </div>
            <div className="blog-comment-icons-wrapper">
                <div className="like-comment-wrapper">
                    <p className="like-comment-text" onClick={handleLike}>
                        Like
                    </p>
                </div>
                <div className="thumbs-up-icon-wrapper">
                    <i className="fas fa-thumbs-up like-icon"></i>
                    <p className="like-icon-text">{comment.likes}</p>
                </div>
            </div>
        </div>
    );
}

function AddComment({ comments, blog }) {
    const user = useContext(UserContext);
    const [commentText, setCommentText] = useState('');

    async function handleAddComment(event) {
        event.preventDefault();

        const comment = await addCommentToBlog(
            blog.id,
            commentText,
            user.state.token
        );

        setCommentText('');

        comments.update([...comments.value, comment.data]);
    }

    const updateCommentText = (event) => {
        setCommentText(event.target.value);
    };

    return (
        <div id="blog-add-comment">
            <form id="blog-comment-form" onSubmit={handleAddComment}>
                <div id="comment-input-container">
                    <CommentInputWithLabel
                        value={commentText}
                        onChange={updateCommentText}
                    />
                </div>
                <div id="add-comment-button" className="inline-button-wrapper">
                    <button className="btn-green">Add Comment</button>
                </div>
            </form>
        </div>
    );
}

export default BlogEntry;
