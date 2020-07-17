import React from "react";
import './squareButton.css';

function SquareButton(props){
    return(
        <div className="square-button-container">
            <button class="square-button">{props.content}</button>
        </div>
    );
}

export default SquareButton;
