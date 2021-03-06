import React from 'react';

import './Home.css';

function Home() {
    return (
        <div className="home-page-wrapper">
            <AboutUsSection />
            <LocationSection />
            <OpeningHours />
        </div>
    );
}

function AboutUsSection() {
    return (
        <div id="about-us-wrapper" className="section">
            <TitleWithIcon title="About-Us" icon="fas fa-info-circle" />
            <div className="section-content">
                <div id="about-us-text">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi vitae efficitur purus. Aliquam felis turpis,
                        eleifend vel arcu quis, sodales lobortis eros. Aenean
                        lacinia, est a posuere scelerisque, nisi augue
                        condimentum sapien, id pretium lacus sapien at tortor.
                        Cras sed sapien nec nibh consectetur placerat. Vivamus
                        pretium accumsan ipsum, in finibus nisi ornare
                        efficitur. Nunc congue ullamcorper arcu nec bibendum.
                        Nulla at ultricies urna. Pellentesque pulvinar eu metus
                        ac malesuada. Suspendisse fringilla ligula eu massa
                        sagittis maximus. Fusce at eros nec diam efficitur
                        viverra. Suspendisse porta dui nec venenatis
                        sollicitudin. Mauris vel justo eros. Proin vitae
                        eleifend ligula, eu fringilla eros. Maecenas nulla
                        metus, rhoncus eu elit a, ullamcorper eleifend lectus.
                        Nulla id sollicitudin velit. In fringilla elit a blandit
                        interdum. Cras fermentum nunc id ex pulvinar
                        condimentum. Ut quis accumsan enim. Donec risus nibh,
                        rhoncus ac feugiat sit amet, tincidunt eget augue.
                    </p>
                </div>
                <div id="about-us-image">
                    <img
                        alt="Placeholder"
                        src="https://www.player1videogames.com/images/store.jpg"
                    />
                </div>
            </div>
        </div>
    );
}

function LocationSection() {
    return (
        <div id="location-wrapper" className="section">
            <TitleWithIcon title="Location" icon="fas fa-location-arrow" />
            <div className="section-content">
                <div id="location-text">
                    <p>College Rd</p>
                    <p>Stoke-on-Trent</p>
                    <p>ST4 2DE</p>
                </div>
                <div id="location-image">
                    <iframe
                        title="Google Maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400.6283963280216!2d-2.178326984174215!3d53.00906577990976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a6834966faedd%3A0x34dc6fb570e7360d!2sStaffordshire%20University!5e0!3m2!1sen!2suk!4v1591694525028!5m2!1sen!2suk"
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

function OpeningHours() {
    return (
        <div id="opening-wrapper" className="section">
            <TitleWithIcon title="Opening Hours" icon="far fa-clock" />
            <div className="section-content">
                <table id="opening-hours-table">
                    <tbody>
                        <OpeningTimesRow day="Monday" times="9am - 5pm" />
                        <OpeningTimesRow day="Tuesday" times="9am - 5pm" />
                        <OpeningTimesRow day="Wednesday" times="9am - 5pm" />
                        <OpeningTimesRow day="Thursday" times="9am - 5pm" />
                        <OpeningTimesRow day="Friday" times="9am - 5pm" />
                        <OpeningTimesRow day="Saturday" times="9am - 5pm" />
                        <OpeningTimesRow day="Sunday" times="Gone Gaming!" />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function OpeningTimesRow({ day, times }) {
    return (
        <tr>
            <td className="opening-day">{day}</td>
            <td className="opening-time">{times}</td>
        </tr>
    );
}

function TitleWithIcon({ title, icon }) {
    let iconHtml = icon + ' section-title-icon';
    return (
        <div className="section-title">
            <h1>
                <i className={iconHtml}></i>
                {title}
            </h1>
        </div>
    );
}

export default Home;
