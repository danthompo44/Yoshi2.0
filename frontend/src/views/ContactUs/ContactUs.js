import React from 'react';

import { Title } from '../../components/titles/titles';
import { InputWithLabel } from '../../components/inputField/inputFieldWithLabel';

import './ContactUs.css';

function ContactUs() {
    return (
        <div id="contact-us-wrapper" className="page-wrapper">
            <Title title={'Contact Us'} />
            {PageInfo()}
            {ContactUsForm()}
        </div>
    );
}

function PageInfo() {
    return (
        <div id="text-wrapper">
            <p>
                Got a question? <br />
                Fill out the form below and we will reply to you as soon as
                possible.
            </p>
        </div>
    );
}

function ContactUsForm() {
    return (
        <div id="contact-form" className="form-wrapper">
            <form className="form-inner-wrapper">
                {ContactUsMessage()}
                {ContactUsDetailsAndButton()}
            </form>
        </div>
    );
}

function ContactUsMessage() {
    return (
        <div id="message-wrapper">
            <label for="message">Message:</label>
            <textarea
                className="form-input"
                name="message"
                placeholder="Enter Your Message"
                required="true"
                id="message"
            ></textarea>
        </div>
    );
}

function ContactUsDetailsAndButton() {
    return (
        <div id="details-wrapper">
            <div className="inline-form-item">
                <InputWithLabel
                    name="email"
                    labelContent="Email Address:"
                    icon="fas fa-envelope"
                    inputType="email"
                    placeholder="Enter Your Email"
                    required="true"
                />
            </div>
            <div className="inline-form-item">
                <InputWithLabel
                    name="name"
                    labelContent="Full Name:"
                    icon="fas fa-user-alt"
                    inputType="text"
                    placeholder="Enter Your Full Name"
                    required="true"
                />
            </div>
            <div className="inline-button-wrapper">
                <button className="btn-green form-button">Send</button>
            </div>
        </div>
    );
}

export default ContactUs;
