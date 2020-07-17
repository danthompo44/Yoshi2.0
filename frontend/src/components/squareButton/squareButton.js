import React from "react";
import './squareButton.css';

function SquareButton(props){
    return(
        <div className="form-button-container">
            <button class="form-button">{props.content}</button>
        </div>
    )
}

export default SquareButton;