import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../views/Home/Home";
import Login from "../views/Login/Login";

import "../public/stylesheets/main-container.css";

function MainContainer() {
  return (
    <div id="main-container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default MainContainer;
