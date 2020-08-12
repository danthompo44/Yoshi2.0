import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../state/userContext';
import service from '../../services/userService';
import useWindowWidth from '../../hooks/useWindowWidth';

import './header.css';

function Header() {
    const CSS_QUERY_WIDTH = 768;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const width = useWindowWidth();

    function toggleMenu() {
        if (width < CSS_QUERY_WIDTH) {
            setIsMenuOpen(!isMenuOpen);
        }
    }

    return (
        <header>
            <div id="main-nav-container">
                <nav id="main-nav" role="navigation">
                    <div className="nav-flex">
                        <div id="nav-title">
                            <h1>OSG</h1>
                        </div>
                        {width < CSS_QUERY_WIDTH && (
                            <HamburgerIcon onClick={toggleMenu} />
                        )}
                    </div>
                    {(width > CSS_QUERY_WIDTH || isMenuOpen) && (
                        <HeaderNavLinks
                            active={width < CSS_QUERY_WIDTH && isMenuOpen}
                            onClick={toggleMenu}
                        />
                    )}
                </nav>
            </div>
        </header>
    );
}

function HeaderNavLinks({ active, onClick }) {
    const { state, dispatch } = useContext(UserContext);

    async function logout() {
        await service.logout(state.id);
        dispatch({
            type: 'logout',
        });
    }

    return (
        <ul className={`nav-links ${active && 'active'}`} id="nav-links">
            <NavLink to="/" text="Home" onClick={onClick} />
            <NavLink to="/products" text="Products" onClick={onClick} />
            <NavLink to="/blog" text="Blog" onClick={onClick} />
            <NavLink to="/contact-us" text="Contact Us" onClick={onClick} />

            {state.isLoggedIn ? (
                <li className="nav-link">
                    <p id="logout-text" onClick={logout}>
                        Logout
                    </p>
                </li>
            ) : (
                <NavLink to="/auth/login" text="Login" onClick={onClick} />
            )}
        </ul>
    );
}

function NavLink({ to, text, onClick }) {
    return (
        <li className="nav-link">
            <Link to={to} onClick={onClick}>
                {text}
            </Link>
        </li>
    );
}

function HamburgerIcon({ onClick }) {
    return (
        <span className="navbar-toggle" id="js-navbar-toggle" onClick={onClick}>
            <i className="fas fa-bars"></i>
        </span>
    );
}

export default Header;
