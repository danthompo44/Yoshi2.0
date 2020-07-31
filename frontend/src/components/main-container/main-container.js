import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../views/Home/Home';
import Login from '../../views/Login/Login';
import Products from '../../views/Products/Products';
import Blog from '../../views/Blog/Blog';
import BlogEntry from '../../views/BlogEntry/BlogEntry';
import ContactUs from '../../views/ContactUs/ContactUs';
import SignUp from '../../views/SignUp/SignUp';
import './main-container.css';

function MainContainer() {
    return <div id="main-container">{MarginContainer()}</div>;
}

function MarginContainer() {
    return (
        <div className="page-wrapper">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/blog" exact component={Blog} />
                <Route path="/blog/1" component={BlogEntry} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/sign-up" component={SignUp} />
            </Switch>
        </div>
    );
}

export default MainContainer;
