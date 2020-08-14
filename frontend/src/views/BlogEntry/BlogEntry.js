import React, { useState, useEffect, useContext } from 'react';
import { BlogEntryTitle } from '../../components/titles/titles';
import { CommentInputWithLabel } from '../../components/inputField/inputFieldWithLabel';
import './BlogEntry.css';

import {
    getBlogById,
    getBlogComments,
    addCommentToBlog,
    likeCommentOnBlog,
} from '../../services/blogService';

import UserContext from '../../state/userContext';

function BlogEntry(props) {
    //retireve paramaters to be used to query the database
    let id = props.match.params.id;

    const [loadingBlog, setLoadingBlog] = useState(true);
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoadingBlog(true);
                var blog = await getBlogById(id);
                setBlog(blog.data);
                setLoadingBlog(false);
            } catch (err) {
                setLoadingBlog(false);
                console.log(err);
            }
        };
        fetchBlog();
    }, [id]);

    const [loadingComments, setLoadingComments] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoadingComments(true);
                var comments = await getBlogComments(id);
                setComments(comments.data);
                setLoadingComments(false);
            } catch (err) {
                setLoadingComments(false);
                console.log(err);
            }
        };
        fetchComments();
    }, [id]);

    return (
        <div className="page-wrapper">
            {!loadingBlog && <BlogEntryTitle blog={blog} />}
            {!loadingBlog && <BlogEntryContent blog={blog} />}
            {!loadingComments && (
                <Comments comments={{ comments, setComments }} blog={blog} />
            )}
            <AddComment comments={{ comments, setComments }} blog={blog} />
        </div>
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
    let commentComponentArray = [];
    for (let i = 0; i < comments.comments.length; i++) {
        commentComponentArray.push(
            <BlogComment
                key={i}
                comment={comments.comments[i]}
                comments={comments}
                blog={blog}
            />
        );
    }
    return <div id="blog-comments">{commentComponentArray}</div>;
}

function BlogComment({ comment, comments, blog }) {
    // console.log(comment.blogCommentLikes.length);
    const user = useContext(UserContext);
    const handleLike = () => {
        likeCommentOnBlog(blog.id, comment.id, user.state.token);

        const newComments = [...comments.comments];
        const index = newComments.findIndex((c) => c.id === comment.id);
        console.log(newComments);
        newComments[index].likes++;

        comments.setComments(newComments);
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
                    <p className="like-icon-text">
                        {comment.blogCommentLikes.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

function AddComment({ comments, blog }) {
    const user = useContext(UserContext);
    const [commentText, setCommentText] = useState('');

    async function handleAddComment(event) {
        let comment;
        event.preventDefault();

        comment = await addCommentToBlog(
            blog.id,
            commentText,
            user.state.token
        );
        comments.setComments([...comments.comments, comment.data]);
    }

    const updateCommentText = (event) => {
        setCommentText(event.target.value);
    };

    return (
        <div id="blog-add-comment">
            <form id="blog-comment-form" onSubmit={handleAddComment}>
                <div id="comment-input-container">
                    <CommentInputWithLabel onChange={updateCommentText} />
                </div>
                <div id="add-comment-button" className="inline-button-wrapper">
                    <button className="btn-green">Add Comment</button>
                </div>
            </form>
        </div>
    );
}

export default BlogEntry;
