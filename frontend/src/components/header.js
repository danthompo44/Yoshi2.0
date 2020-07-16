import React from 'react';
import '../public/stylesheets/header.css';

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
                        <li class="nav-link"><a href="/">Home</a></li>
                        <li class="nav-link"><a href="/products">Products</a></li>
                        <li class="nav-link"><a href="/blog">Blog</a></li>
                        <li class="nav-link">
                            <a href="/contact-us">Contact Us</a>
                        </li>
                        <li class="nav-link"><a href="/auth/login">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;