import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import UserContext from '../../state/userContext';
import service from '../../services/userService';

import { Title } from '../../components/titles/titles';
import Button from '../../components/squareButton/squareButton';
import FormWrapper from '../../components/form-wrapper/form-wrapper';
import { InputWithLabel } from '../../components/inputField/inputFieldWithLabel';

import './SignUp.css';

function SignUp() {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function updateEmail(event) {
        setEmail(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function updateConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }

    async function signup(event) {
        try {
            setErrors([]);

            event.preventDefault();

            if (password !== confirmPassword) {
                setErrors([...errors, { message: 'Passwords do not match' }]);
                return;
            }

            const userData = await service.signup(email, password);
            dispatch({
                type: 'signup',
                payload: {
                    id: userData.data.id,
                    token: userData.data.token,
                },
            });

            history.replace('/');
        } catch (err) {}
    }

    return (
        <div className="sign-up-container">
            <Title title={'Sign Up'} />
            <FormWrapper onSubmit={signup}>
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
                    <InputWithLabel
                        name="confirm-password"
                        labelContent="Confirm Password:"
                        icon={'fas fa-lock'}
                        inputType="password"
                        placeholder="Confirm Your Password"
                        required="true"
                        value={confirmPassword}
                        setValue={updateConfirmPassword}
                    />
                    <Button content="Register" />
                </div>
                {errors.map((err, index) => (
                    <p key={index} className="error-text">
                        {err.message}
                    </p>
                ))}
                {state.errors.length > 0 && (
                    <p className="error-text">Unable to sign up, try again</p>
                )}
                <Link to="/auth/login" id="sign-up-link">
                    Back to login
                </Link>
            </FormWrapper>
        </div>
    );
}

export default SignUp;
