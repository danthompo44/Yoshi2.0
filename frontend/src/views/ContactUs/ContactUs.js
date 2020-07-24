import React from 'react';

import Title from '../../components/title/title';
import InputFieldWithLabel from '../../components/inputField/inputFieldWithLabel';

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
        <div id="contact-form" class="form-wrapper">
            <form class="form-inner-wrapper">
                {ContactUsMessage()}
                {ContactUsDetails()}
            </form>
        </div>
    );
}

function ContactUsMessage() {
    return (
        <div id="message-wrapper">
            <label for="message">Message:</label>
            <textarea
                class="form-input"
                name="message"
                placeholder="Enter your message"
                required="true"
                id="message"
            ></textarea>
        </div>
    );
}

function ContactUsDetails() {
    return (
        <div id="details-wrapper">
            <div class="inline-form-item">
                <InputFieldWithLabel
                    name="email"
                    labelContent="Email Address:"
                    icon="fas fa-envelope"
                    inputType="email"
                    placeholder="Enter your email"
                    required="true"
                />
            </div>
            <div class="inline-form-item">
                <InputFieldWithLabel
                    name="name"
                    labelContent="Full Name:"
                    icon="fas fa-user-alt"
                    inputType="text"
                    placeholder="Enter your full name"
                    required="true"
                />
            </div>
            <div class="inline-button-wrapper">
                <button class="btn-green form-button">Send</button>
            </div>
        </div>
    );
}

export default ContactUs;
