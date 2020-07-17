import React from 'react';

import './search-bar.css';

function SearchBar(){
    return (
        <div id="search-container">
            <div id="search-bar">
                <label for="search">Search:</label>
                <i class="fas fa-search input-icon"></i>
                <input
                    id="search"
                    class="form-input with-icon"
                    placeholder="Search..."
                    type="text"
                    name="search"
                    required="true"
                />
            </div>
        </div>
    )
}

export default SearchBar;