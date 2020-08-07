import React, { useState, useEffect } from 'react';
import './SingleProduct.css';

import {Title} from '../../components/titles/titles';
import FilledHeart from '../../components/heartIcon/filledHeart';
import UnfilledHeart from '../../components/heartIcon/unfilledHeart';

import {getGamePostByGameId} from '../../services/gameService';
import {getConsolePostByConsoleId} from '../../services/consoleService';

function SingleProduct(props){
    //retireve paramaters to be used to query the database
    let id = props.match.params.id;
    let type = props.match.params.type;

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                var product = "";
                switch(type){
                    case "consoles":
                        product = await getConsolePostByConsoleId(id);
                        break;
                    case "games":
                        product = await getGamePostByGameId(id);
                        break;
                }
                setProduct(product.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        fetchProduct();
    }, []);
    // console.log(product);
    return(
        <>
        {!loading && (<TopContainer product={product}/>)}
        {!loading && (<BottomContainer product={product}/>)}
        </>
    )
}

function TopContainer({product}){
    return (
        <>
        <Title title={product[0].title} />
        <div className="top-content-container">
            <div id="top-content-wrapper">
            <Paragraph content={product[0].content}/>
            <Image />
            <Paragraph content={product[0].content}/>
            <Video />
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

function Image(){
    return (
        <img className="product-media" src="https://th.bing.com/th/id/OIP.zM3QRIjlPHyTbwWPA3TQUwHaEK?pid=Api&rs=1" 
        alt="SNES"/>
    )
}

function Video(){
    return (
        <iframe className="product-media"width="560" height="315" title="A Snes video" src="https://www.youtube.com/embed/f4Ge7iVyOyw" 
            frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
        </iframe>
    )
}

function BottomContainer(){
    return (
        <div id="bottom-content-wrapper">
            <LeftBottomBox />
            <RightBottomBox />
        </div>
    )
}

function LeftBottomBox(){
    return(
        <div class="left-bottom-box">
            <ProductInfo icon="fas fa-user-friends" text="Multiplayer"/>
            <ProductInfo icon="fas fa-wifi" text="Offline"/>
            <ProductInfo icon="fas fa-gamepad" text="Console"/>
            <ProductInfo icon="fas fa-chart-line" text="Trending"/>
            <ProductInfo icon="fas fa-pound-sign" text="£40"/>
            <ProductRating/>         
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

function ProductRating(){
    return (
        <div class="product-rating">
            <DisplayRating filled={3} />                
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
                    <p class="like-comment-text">
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
                    required="true"
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