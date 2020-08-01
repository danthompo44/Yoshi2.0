import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UserProvider from './providers/UserProvider';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import MainContainer from './components/main-container/main-container';

import './App.css';

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Header />
                <MainContainer />
                <Footer />
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
