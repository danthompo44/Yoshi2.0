import React from "react";
import './formButton.css';

function formButton(props){
    return(
        <div className="form-button-container">
            <button class="form-button">{props.content}</button>
        </div>
    )
}

export default formButton;