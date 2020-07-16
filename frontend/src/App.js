import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import MainContainer from './components/main-container';

function App() {
  return (
    [<Header/>,
      <MainContainer/>,
    <Footer/>]
  );
}

export default App;
