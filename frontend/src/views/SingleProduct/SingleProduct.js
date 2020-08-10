import React, { useState, useEffect } from 'react';
import './SingleProduct.css';

import {Title} from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

import {getGamePostByGameId, getGameById, getGamePostComments} from '../../services/gameService';
import {getConsolePostByConsoleId, getConsoleById, getConsolePostComments} from '../../services/consoleService';

function SingleProduct(props){
    //retireve paramaters to be used to query the database
    let id = props.match.params.id;
    let type = props.match.params.type;

    const [loadingPost, setLoadingPost] = useState(true);
    const [productPost, setProductPost] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [product, setProduct] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchProductPost = async () => {
            try {
                setLoadingPost(true);
                var productPost = "";
                switch(type){
                    case "consoles":
                        productPost = await getConsolePostByConsoleId(id);
                        break;
                    case "games":
                        productPost = await getGamePostByGameId(id);
                        break;
                }
                setProductPost(productPost.data);
                setLoadingPost(false);
            } catch (err) {
                setLoadingPost(false);
                console.log(err);
            }
        };
        fetchProductPost();
    }, [id, type]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadingProduct(true);
                var product = "";
                switch(type){
                    case "consoles":
                        product = await getConsoleById(id);
                        break;
                    case "games":
                        product = await getGameById(id);
                        break;
                }
                setProduct(product.data);
                setLoadingProduct(false);
            } catch (err) {
                setLoadingProduct(false);
                console.log(err);
            }
        };
        fetchProduct();
    }, [id, type]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoadingComments(true);
                var comments = "";
                switch(type){
                    case "consoles":
                        comments = await getConsolePostComments(id);
                        break;
                    case "games":
                        comments = await getGamePostComments(id);
                        break;
                }
                setComments(comments.data);
                setLoadingComments(false);
            } catch (err) {
                setLoadingComments(false);
                console.log(err);
            }
        };
        fetchComments();
    }, [id, type]);
    return(
        <>
        {!loadingPost && !loadingProduct && (<TopContainer productPost={productPost} product ={product}/>)}
        {!loadingPost && !loadingProduct && !loadingComments && (<BottomContainer productPost={productPost} product ={product} comments={comments}/>)}
        </>
    )
}

function TopContainer({productPost, product}){
    return (
        <>
        <Title title={productPost.title} />
        <div className="top-content-container">
            <div id="top-content-wrapper">
            <Paragraph content={productPost.content}/>
            <Image url={product.image_url} alt ={product.image_alt}/>
            <Paragraph content={productPost.content}/>
            <Video src={product.video_src}/>
            </div>
        </div>
        </>
    )
}
function Paragraph({content}){
    return (
        <div className="text-content">
            <p>{content}</p>
        </div>
    )
}

function Image({url, alt}){
    return (
        <img className="product-media" src={url} 
        alt={alt}/>
    )
}

function Video({src}){
    // console.log(src);
    // let attributes = ' className="product-media"' + src.src;
    // console.log(attributes);
    // let iframe = <iframe attributes></iframe>;
    // console.log(iframe);
    return (
        <iframe title="Video" src={src} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    )
}

function BottomContainer({productPost, product, comments}){
    return (
        <div id="bottom-content-wrapper">
            <LeftBottomBox product={product}/>
            <RightBottomBox />
        </div>
    )
}

function LeftBottomBox({product}){
    console.log(product);
    return(
        <div className="left-bottom-box">
            <ProductInfo icon="fas fa-user-friends" text={product.multiplayer ? 'Multiplayer' : 'Singleplayer'}/>
            <ProductInfo icon="fas fa-wifi" text={product.online ? 'Online' : 'Offline'}/>
            {product.form_factor ? <ProductInfo icon="fas fa-gamepad" text={product.form_factor}/> : null}
            {product.trending ? <ProductInfo icon="fas fa-chart-line" text="Trending"/> : null}
            <ProductInfo icon="fas fa-pound-sign" text={'£' + product.cost}/>
            <ProductRating rating={product.rating}/>         
        </div>
    )
}

function ProductInfo({icon, text}){
    let iconHtml = icon + ' product-info-icon';
    return (
        <div className="product-info">
            <i className={iconHtml}/>
            <p className="product-info-text">{text}</p>
        </div>
    )
}

function ProductRating({rating}){
    return (
        <div className="product-rating">
            <DisplayRating filled={rating} />                
            <p className="product-info-text">10 reviews</p>
        </div>
    )
}

function DisplayRating({filled}) {
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

function RightBottomBox(){
    return (
        <div className="right-bottom-box">
            <Title title="Comments"/>
            <Comments />
        </div>        
    )
}

function Comments(){
    return(
        <div id="product-comments">
            <Comment comment="Comment 1" likes="9"/>
            <Comment comment="Comment 2" likes="11"/>
            <AddComment/>
        </div>
    )
}

function Comment({comment, likes}){
    return(
        <div className="single-product-comment">
            <div className="single-product-comment-box">
                <p className="single-product-comment-text">
                    {comment}
                </p>
            </div>
            <div className="single-product-comment-icons-wrapper">
                <div className="like-comment-wrapper">
                    <p className="like-comment-text">
                    Like
                    </p>
                </div>
                <div className="thumbs-up-icon-wrapper">
                    <i className="fas fa-thumbs-up like-icon"></i>
                    <p className="like-icon-text">{likes}</p>
                </div>
            </div> 
        </div>
    )
}

function AddComment(){
    return (
        <div id="blog-add-comment">
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
                />
            </div>
            <div className="inline-button-wrapper blog-btn-wrapper">
                <button className="btn-green">Add Comment</button>
            </div>
        </div>
    )
}

export default SingleProduct;