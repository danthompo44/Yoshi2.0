import React from 'react';

import './filledHeart.css';

//creates a green filled Heart Icon
function FilledHeart({ onClick }) {
    return (
        <i
            className="fas fa-heart filled"
            onClick={onClick}
            style={{ cursor: onClick != null ? 'pointer' : 'normal' }}
        ></i>
    );
}

export default FilledHeart;
