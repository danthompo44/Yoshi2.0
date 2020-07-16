import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import MainContainer from "./components/main-container/main-container";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
