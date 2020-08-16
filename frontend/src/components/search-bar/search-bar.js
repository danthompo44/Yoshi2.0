import React, { useState } from 'react';

import './search-bar.css';

function SearchBar({ searchFn }) {
    const [text, setText] = useState('');

    function search() {
        searchFn(text);
    }

    function updateText(event) {
        setText(event.target.value);
    }

    return (
        <div id="search-container">
            <div id="search-bar">
                <label htmlFor="search">Search:</label>
                <i className="fas fa-search input-icon" onClick={search}></i>
                <input
                    id="search"
                    className="form-input with-icon"
                    placeholder="Search..."
                    type="text"
                    name="search"
                    required={true}
                    value={text}
                    onChange={updateText}
                />
            </div>
        </div>
    );
}

export default SearchBar;
