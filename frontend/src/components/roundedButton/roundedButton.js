import React from 'react';

import './roundedButton.css';

function RoundedButton(props) {
    return (
        <div className="btn-wrapper">
            <button className="btn-green">{props.content}</button>
        </div>
    );
}

export default RoundedButton;
