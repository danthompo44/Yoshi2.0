import React from 'react';

import Title from '../../components/title/title';

function Home() {
    const title = 'Home Page';
    return (
        <div className="home-page">
            <Title title={title} />
        </div>
    );
}

export default Home;
