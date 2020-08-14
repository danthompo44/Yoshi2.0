import React, { useState, useContext, useCallback } from 'react';
import './SingleProduct.css';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

import {
    getGamePostByGameId,
    getGameById,
    getGamePostComments,
    addCommentToGamePost,
    likeCommentOnGamePost,
} from '../../services/gameService';
import {
    getConsolePostByConsoleId,
    getConsoleById,
    getConsolePostComments,
    addCommentToConsolePost,
    likeCommentOnConsolePost,
} from '../../services/consoleService';
import UserContext from '../../state/userContext';
import useFetchData from '../../hooks/useFetchData';

function SingleProduct(props) {
    //retireve paramaters to be used to query the database
    let id = props.match.params.id;
    let type = props.match.params.type;

    const postMethod = useCallback(async () => {
        switch (type) {
            case 'consoles':
                return await getConsolePostByConsoleId(id);
            case 'games':
                return await getGamePostByGameId(id);
            default:
                throw Error('Type is not valid');
        }
    }, [id, type]);

    const productsMethod = useCallback(async () => {
        switch (type) {
            case 'consoles':
                return await getConsoleById(id);
            case 'games':
                return await getGameById(id);
            default:
                throw Error('Type is not valid');
        }
    }, [id, type]);

    const [{ value: loadingProduct }, { value: product }] = useFetchData(
        productsMethod
    );

    const [{ value: loadingPost }, { value: productPost }] = useFetchData(
        postMethod
    );

    return (
        <>
            {!loadingPost && !loadingProduct && (
                <TopContainer productPost={productPost} product={product} />
            )}
            {!loadingPost && !loadingProduct && (
                <BottomContainer
                    productPost={productPost}
                    product={product}
                    type={type}
                />
            )}
        </>
    );
}

function TopContainer({ productPost, product }) {
    return (
        <>
            <Title title={productPost.title} />
            <div className="top-content-container">
                <div id="top-content-wrapper">
                    <Paragraph content={productPost.paragraph_one} />
                    <Image url={product.image_url} alt={product.image_alt} />
                    <Paragraph content={productPost.paragraph_two} />
                    <Video src={product.video_src} />
                </div>
            </div>
        </>
    );
}

function Paragraph({ content }) {
    return (
        <div className="text-content">
            <p>{content}</p>
        </div>
    );
}

function Image({ url, alt }) {
    return <img className="product-media" src={url} alt={alt} />;
}

function Video({ src }) {
    return (
        <iframe
            title="Video"
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="iframe-video"
        ></iframe>
    );
}

function BottomContainer({ productPost, product, type }) {
    return (
        <div id="bottom-content-wrapper">
            <LeftBottomBox product={product} />
            <RightBottomBox post={productPost} type={type} />
        </div>
    );
}

function LeftBottomBox({ product }) {
    return (
        <div className="left-bottom-box">
            <ProductInfo
                icon="fas fa-user-friends"
                text={product.multiplayer ? 'Multiplayer' : 'Singleplayer'}
            />
            <ProductInfo
                icon="fas fa-wifi"
                text={product.online ? 'Online' : 'Offline'}
            />
            {product.form_factor ? (
                <ProductInfo icon="fas fa-gamepad" text={product.form_factor} />
            ) : null}
            {product.trending ? (
                <ProductInfo icon="fas fa-chart-line" text="Trending" />
            ) : null}
            <ProductInfo icon="fas fa-pound-sign" text={'£' + product.cost} />
            <ProductRating rating={product.rating} />
        </div>
    );
}

function ProductInfo({ icon, text }) {
    let iconHtml = icon + ' product-info-icon';
    return (
        <div className="product-info">
            <i className={iconHtml} />
            <p className="product-info-text">{text}</p>
        </div>
    );
}

function ProductRating({ rating }) {
    return (
        <div className="product-rating">
            <p className="rating-info-text">Rating</p>
            <DisplayRating filled={rating} />
        </div>
    );
}

function DisplayRating({ filled }) {
    const hearts = [];
    for (let index = 0; index < 5; index++) {
        if (filled > index) {
            hearts.push(<FilledHeart key={index} />);
        } else {
            hearts.push(<UnfilledHeart key={index} />);
        }
    }
    return hearts;
}

function RightBottomBox({ post, type }) {
    const commentsMethod = useCallback(async () => {
        switch (type) {
            case 'consoles':
                return await getConsolePostComments(post.id);
            case 'games':
                return await getGamePostComments(post.id);
            default:
                throw Error('Type is not valid');
        }
    }, [post.id, type]);

    const [{ value: loadingComments }, comments] = useFetchData(commentsMethod);

    return (
        <div className="right-bottom-box">
            <Title title="Comments" />
            {!loadingComments && (
                <Comments comments={comments} post={post} type={type} />
            )}
        </div>
    );
}

function Comments({ comments, post, type }) {
    return (
        <div id="product-comments">
            {comments.value.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment}
                    comments={comments}
                    type={type}
                    post={post}
                />
            ))}
            <AddComment comments={comments} post={post} type={type} />
        </div>
    );
}

function Comment({ comment, comments, type, post }) {
    const user = useContext(UserContext);

    const handleLike = () => {
        if (type === 'consoles') {
            likeCommentOnConsolePost(post.id, comment.id, user.state.token);
        } else {
            likeCommentOnGamePost(post.id, comment.id, user.state.token);
        }

        const newComments = [...comments.value];
        const index = newComments.findIndex((c) => c.id === comment.id);
        newComments[index].likes++;

        comments.update(newComments);

        //add restriction to user only vbeing able to like a comment once, shange the text to unlike once clicked
    };

    return (
        <div className="single-product-comment">
            <div className="single-product-comment-box">
                <p className="single-product-comment-text">{comment.comment}</p>
            </div>
            <div className="single-product-comment-icons-wrapper">
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

function AddComment({ comments, post, type }) {
    const user = useContext(UserContext);
    const [commentText, setCommentText] = useState('');

    async function handleAddComment(event) {
        event.preventDefault();
        let comment;

        if (type === 'consoles') {
            comment = await addCommentToConsolePost(
                post.id,
                commentText,
                user.state.token
            );
        } else {
            comment = await addCommentToGamePost(
                post.id,
                commentText,
                user.state.token
            );
        }
        comments.update([...comments.value, comment.data]);

        setCommentText('');
    }

    const updateCommentText = (event) => {
        setCommentText(event.target.value);
    };

    return (
        <div id="blog-add-comment">
            <form id="add-comment-form" onSubmit={handleAddComment}>
                <div className="inline-form-item">
                    <label htmlFor="comment">Add Comment:</label>
                    <i className="fas fa-comment input-icon"></i>
                    <input
                        className="form-input light with-icon"
                        type="text"
                        name="comment"
                        placeholder="Add a comment"
                        required={true}
                        id="comment"
                        value={commentText}
                        onChange={updateCommentText}
                    />
                </div>
                <div id="add-comment-button-wrapper">
                    <button className="btn-green" type="submit">
                        Add Comment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SingleProduct;
