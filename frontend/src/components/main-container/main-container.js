import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../views/Home/Home';
import Login from '../../views/Login/Login';
import Products from '../../views/Products/Products';
import SingleProduct from '../../views/SingleProduct/SingleProduct';
import Blog from '../../views/Blog/Blog';
import BlogEntry from '../../views/BlogEntry/BlogEntry';
import ContactUs from '../../views/ContactUs/ContactUs';
import SignUp from '../../views/SignUp/SignUp';

import './main-container.css';

function MainContainer() {
    return (
        <div id="main-container">
            <MarginContainer />
        </div>
    );
}

function MarginContainer() {
    return (
        <div className="page-wrapper">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/:type/:id" component={SingleProduct} />
                <Route path="/blog" exact component={Blog} />
                <Route path="/blog/:id" component={BlogEntry} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/sign-up" component={SignUp} />
            </Switch>
        </div>
    );
}

export default MainContainer;
