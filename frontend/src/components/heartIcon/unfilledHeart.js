import React from 'react';

//creates an Unfilled Heart Icon
function EmptyHeart({ onClick }) {
    return (
        <i
            className="fas fa-heart"
            onClick={onClick}
            style={{ cursor: onClick != null ? 'pointer' : 'normal' }}
        ></i>
    );
}

export default EmptyHeart;
