import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import UserContext from '../../state/userContext';
import service from '../../services/userService';

import { Title } from '../../components/titles/titles';
import { InputWithLabel } from '../../components/inputField/inputFieldWithLabel';
import Button from '../../components/squareButton/squareButton';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

import './Login.css';

function Login() {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function updateEmail(event) {
        setEmail(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    async function login(event) {
        try {
            event.preventDefault();

            const userData = await service.login(email, password);
            dispatch({
                type: 'login',
                payload: {
                    id: userData.data.id,
                    token: userData.data.token,
                },
            });

            // return user to home page
            history.replace('/');
        } catch (err) {}
    }

    return (
        <div id="login-container">
            <Title title={'Login'} />
            <FormWrapper onSubmit={login}>
                <div
                    className={`form-inner-wrapper ${
                        state.errors.length > 0 && 'error'
                    }`}
                >
                    <InputWithLabel
                        name="email"
                        labelContent="Email Address:"
                        icon={'fas fa-envelope'}
                        inputType="email"
                        placeholder="Enter Your Email"
                        required="true"
                        value={email}
                        setValue={updateEmail}
                    />
                    <InputWithLabel
                        name="password"
                        labelContent="Password:"
                        icon={'fas fa-lock'}
                        inputType="password"
                        placeholder="Enter Your Password"
                        required="true"
                        value={password}
                        setValue={updatePassword}
                    />
                    <Button content="Login" />
                    <Link to="/" id="forgotten-password">
                        Forgotten Password?
                    </Link>
                </div>
                {state.errors.length > 0 && (
                    <div className="error-text">Unable to login, try again</div>
                )}
                <Link to="/auth/sign-up" id="sign-up-link">
                    No account? Sign Up
                </Link>
            </FormWrapper>
        </div>
    );
}

export default Login;
