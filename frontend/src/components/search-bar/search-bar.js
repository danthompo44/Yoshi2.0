import React from 'react';

import './search-bar.css';

function SearchBar() {
    return (
        <div id="search-container">
            <div id="search-bar">
                <label htmlFor="search">Search:</label>
                <i className="fas fa-search input-icon"></i>
                <input
                    id="search"
                    className="form-input with-icon"
                    placeholder="Search..."
                    type="text"
                    name="search"
                    required={true}
                />
            </div>
        </div>
    );
}

export default SearchBar;
