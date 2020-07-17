import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

function Header() {
    return (
        <header>
            <div id="main-nav-container">
                <nav id="main-nav" role="navigation">
                    <div class="nav-flex">
                        <div id="nav-title">
                            <h1>OSG</h1>
                        </div>
                        <span class="navbar-toggle" id="js-navbar-toggle">
                            <i class="fas fa-bars"></i>
                        </span>
                    </div>
                    <ul class="nav-links" id="nav-links">
                        <li class="nav-link">
                            <Link to="/">Home</Link>
                        </li>
                        <li class="nav-link">
                            <Link to="/products">Products</Link>
                        </li>
                        <li class="nav-link">
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li class="nav-link">
                            <Link to="/contact-us">Contact Us</Link>
                        </li>
                        <li class="nav-link">
                            <Link to="/auth/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;
