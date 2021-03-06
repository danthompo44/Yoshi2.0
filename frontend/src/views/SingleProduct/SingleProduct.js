import React, { useState, useContext, useCallback } from 'react';

import UserContext from '../../state/userContext';

import {
    getGamePostByGameId,
    getGameById,
    getGamePostComments,
    addCommentToGamePost,
    likeCommentOnGamePost,
    unlikeCommentOnGamePost,
    setRatingOnGame,
} from '../../services/gameService';
import {
    getConsolePostByConsoleId,
    getConsoleById,
    getConsolePostComments,
    addCommentToConsolePost,
    likeCommentOnConsolePost,
    unlikeCommentOnConsolePost,
    setRatingOnConsole,
} from '../../services/consoleService';

import useFetchData from '../../hooks/useFetchData';

import { Title } from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

import './SingleProduct.css';

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

    const [{ value: loadingProduct }, product] = useFetchData(productsMethod);

    const [{ value: loadingPost }, { value: productPost }] = useFetchData(
        postMethod
    );

    return (
        <>
            {!loadingPost && !loadingProduct && (
                <TopContainer
                    productPost={productPost}
                    product={product.value}
                />
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
            className="product-media iframe-video"
            title="Video"
            src={src}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}

function BottomContainer({ productPost, product, type }) {
    return (
        <div id="bottom-content-wrapper">
            <LeftBottomBox product={product} type={type} />
            <RightBottomBox post={productPost} type={type} />
        </div>
    );
}

function LeftBottomBox({ product, type }) {
    const user = useContext(UserContext);

    return (
        <div className="left-bottom-box">
            <ProductInfo
                icon="fas fa-user-friends"
                text={
                    product.value.multiplayer ? 'Multiplayer' : 'Singleplayer'
                }
            />
            <ProductInfo
                icon="fas fa-wifi"
                text={product.value.online ? 'Online' : 'Offline'}
            />
            {product.value.form_factor ? (
                <ProductInfo
                    icon="fas fa-gamepad"
                    text={product.value.form_factor}
                />
            ) : null}
            {product.value.trending ? (
                <ProductInfo icon="fas fa-chart-line" text="Trending" />
            ) : null}
            <ProductInfo
                icon="fas fa-pound-sign"
                text={'??' + product.value.cost}
            />
            <ProductRating
                rating={product.value.averageRating}
                ratings={product.value.ratings}
            />
            {user.state.isLoggedIn && (
                <CreateOrUpdateRating
                    product={product}
                    type={type}
                    ratings={product.value.ratings}
                />
            )}
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

function ProductRating({ rating, ratings }) {
    return (
        <div className="product-rating">
            <DisplayRating filled={rating} />
            <p className="rating-info-text">{ratings.length || 0} reviews</p>
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

function CreateOrUpdateRating({ product, ratings, type }) {
    const user = useContext(UserContext);
    const [userRating, setUserRating] = useState(getUserRating());

    function getUserRating() {
        const rating = ratings.find(
            (r) => r.user_id === parseInt(user.state.id)
        );

        return rating ? rating.rating : 0;
    }

    async function setRating(index) {
        setUserRating(index);
        // update db for either console or game

        try {
            let rating;
            if (type === 'games') {
                rating = await setRatingOnGame(
                    product.value.id,
                    index,
                    user.state
                );
            } else {
                rating = await setRatingOnConsole(
                    product.value.id,
                    index,
                    user.state
                );
            }

            const newProduct = { ...product.value };

            // update current rating on frontend
            const ratingIndex = ratings.findIndex(
                (r) => parseInt(r.user_id) === parseInt(user.state.id)
            );

            // if no current rating
            if (ratingIndex === -1) {
                newProduct.ratings.push(rating.data);
            } else {
                // reset value in current index
                newProduct.ratings[ratingIndex].rating = index;
            }

            // calculate average rating again
            let totalOfRatings = 0;
            newProduct.ratings.forEach((r) => (totalOfRatings += r.rating));

            const numOfRatings = newProduct.ratings.length;
            newProduct.averageRating = totalOfRatings / numOfRatings;

            product.update(newProduct);
        } catch (err) {
            // implement error handling
            console.log(err);
        }
    }

    return (
        <div id="submit-rating-container">
            <p>Your rating</p>
            <CreateRating currentRating={userRating} setRating={setRating} />
        </div>
    );
}

function CreateRating({ currentRating = 0, setRating }) {
    const hearts = [];

    for (let index = 0; index < 5; index++) {
        if (currentRating > index) {
            hearts.push(
                <FilledHeart key={index} onClick={() => setRating(index + 1)} />
            );
        } else {
            hearts.push(
                <UnfilledHeart
                    key={index}
                    onClick={() => setRating(index + 1)}
                />
            );
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

    const isProductAConsole = (type) => {
        if (type === 'consoles') {
            return true;
        }
        return false;
    };

    const isCommentLiked = () => {
        if (!user.state.isLoggedIn) {
            return false;
        }
        let currentComment = comments.value.find((c) => c.id === comment.id);

        let index;
        if (isProductAConsole(type)) {
            index = currentComment.consolePostCommentLikes.findIndex(
                (c) => parseInt(c.user_id) === parseInt(user.state.id)
            );
        } else {
            index = currentComment.gamePostCommentLikes.findIndex(
                (c) => parseInt(c.user_id) === parseInt(user.state.id)
            );
        }

        return index > -1;
    };

    const handleLike = async () => {
        let like;
        if (isProductAConsole(type)) {
            like = await likeCommentOnConsolePost(
                post.id,
                comment.id,
                user.state
            );
        } else {
            like = await likeCommentOnGamePost(post.id, comment.id, user.state);
        }

        const newComments = [...comments.value];
        const index = newComments.findIndex(
            (c) => c.id === parseInt(comment.id)
        );
        if (isProductAConsole(type)) {
            newComments[index].consolePostCommentLikes.push(like.data);
        } else {
            newComments[index].gamePostCommentLikes.push(like.data);
        }

        comments.update(newComments);
    };

    const handleUnlike = async () => {
        if (type === 'consoles') {
            await unlikeCommentOnConsolePost(post.id, comment.id, user.state);
        } else {
            await unlikeCommentOnGamePost(post.id, comment.id, user.state);
        }

        const newComments = [...comments.value];
        const commentIndex = newComments.findIndex((c) => c.id === comment.id);

        let likeIndex;
        if (isProductAConsole(type)) {
            likeIndex = newComments[
                commentIndex
            ].consolePostCommentLikes.findIndex(
                (c) => parseInt(c.user_id) === parseInt(user.state.id)
            );
        } else {
            likeIndex = newComments[
                commentIndex
            ].gamePostCommentLikes.findIndex(
                (c) => parseInt(c.user_id) === parseInt(user.state.id)
            );
        }

        if (likeIndex > -1) {
            if (isProductAConsole(type)) {
                newComments[commentIndex].consolePostCommentLikes.splice(
                    likeIndex,
                    1
                );
            } else {
                newComments[commentIndex].gamePostCommentLikes.splice(
                    likeIndex,
                    1
                );
            }
        }
        comments.update(newComments);
    };

    return (
        <div className="single-product-comment">
            <div className="single-product-comment-box">
                <p className="single-product-comment-text">{comment.comment}</p>
            </div>
            <div className="single-product-comment-icons-wrapper">
                <div className="like-comment-wrapper">
                    <p
                        className="like-comment-text"
                        onClick={() =>
                            isCommentLiked() ? handleUnlike() : handleLike()
                        }
                    >
                        {isCommentLiked() ? 'Unlike' : 'Like'}
                    </p>
                </div>
                <div className="thumbs-up-icon-wrapper">
                    <i className="fas fa-thumbs-up like-icon"></i>
                    <p className="like-icon-text">
                        {isProductAConsole(type)
                            ? comment.consolePostCommentLikes.length
                            : comment.gamePostCommentLikes.length}
                    </p>
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
