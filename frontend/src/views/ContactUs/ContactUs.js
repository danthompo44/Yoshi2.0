import React, { useState } from 'react';

import { createQuery } from '../../services/queryService';

import { Title } from '../../components/titles/titles';
import { InputWithLabel } from '../../components/inputField/inputFieldWithLabel';

import './ContactUs.css';

function ContactUs() {
    return (
        <div id="contact-us-wrapper" className="page-wrapper">
            <Title title={'Contact Us'} />
            <PageInfo />
            <ContactUsForm />
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
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    function resetState() {
        setMessage('');
        setEmail('');
        setName('');
    }

    async function submit(event) {
        try {
            event.preventDefault();
            setError('');

            await createQuery(message, email, name);
            setSuccess('Created query!');
            resetState();
            // reset success message after 5 seconds.
            setTimeout(() => {
                setSuccess('');
            }, 5000);
        } catch (err) {
            setError('Failed to create query');
        }
    }

    return (
        <>
            <div id="contact-form" className="form-wrapper">
                <form className="form-inner-wrapper" onSubmit={submit}>
                    <ContactUsMessage
                        message={message}
                        setMessage={setMessage}
                    />
                    <ContactUsDetailsAndButton
                        email={email}
                        setEmail={setEmail}
                        name={name}
                        setName={setName}
                    />
                </form>
            </div>
            {success && <p className="success-query-text">{success}</p>}
            {error && <p className="error-query-text">{error}</p>}
        </>
    );
}

function ContactUsMessage({ message, setMessage }) {
    function updateMessage(event) {
        setMessage(event.target.value);
    }

    return (
        <div id="message-wrapper">
            <label htmlFor="message">Message:</label>
            <textarea
                className="form-input"
                name="message"
                placeholder="Enter Your Message"
                required={true}
                id="message"
                value={message}
                onChange={updateMessage}
            ></textarea>
        </div>
    );
}

function ContactUsDetailsAndButton({ email, setEmail, name, setName }) {
    function updateEmail(event) {
        setEmail(event.target.value);
    }

    function updateName(event) {
        setName(event.target.value);
    }

    return (
        <div id="details-wrapper">
            <div className="inline-form-item">
                <InputWithLabel
                    name="email"
                    labelContent="Email Address:"
                    icon="fas fa-envelope"
                    inputType="email"
                    placeholder="Enter Your Email"
                    required={true}
                    value={email}
                    setValue={updateEmail}
                />
            </div>
            <div className="inline-form-item">
                <InputWithLabel
                    name="name"
                    labelContent="Full Name:"
                    icon="fas fa-user-alt"
                    inputType="text"
                    placeholder="Enter Your Full Name"
                    required={true}
                    value={name}
                    setValue={updateName}
                />
            </div>
            <div className="inline-button-wrapper">
                <button className="btn-green form-button">Send</button>
            </div>
        </div>
    );
}

export default ContactUs;
