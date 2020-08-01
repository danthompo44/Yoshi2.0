import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../state/userContext';
import service from '../../services/userService';

import './header.css';

function Header() {
    const { state, dispatch } = useContext(UserContext);

    async function logout() {
        await service.logout(state.id);
        dispatch({
            type: 'logout',
        });
    }

    return (
        <header>
            <div id="main-nav-container">
                <nav id="main-nav" role="navigation">
                    <div className="nav-flex">
                        <div id="nav-title">
                            <h1>OSG</h1>
                        </div>
                        <span className="navbar-toggle" id="js-navbar-toggle">
                            <i className="fas fa-bars"></i>
                        </span>
                    </div>
                    <ul className="nav-links" id="nav-links">
                        <li className="nav-link">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/products">Products</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/contact-us">Contact Us</Link>
                        </li>
                        <li className="nav-link">
                            {state.isLoggedIn ? (
                                <p id="logout-text" onClick={logout}>
                                    Logout
                                </p>
                            ) : (
                                <Link to="/auth/login">Login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;
