import React from 'react';

import { Title } from '../../components/titles/titles';
import Button from '../../components/squareButton/squareButton';
import FormWrapper from '../../components/form-wrapper/form-wrapper';
import { InputWithLabel } from '../../components/inputField/inputFieldWithLabel';

import './SignUp.css';

function SignUp() {
    return (
        <div className="sign-up-container">
            <Title title={'Sign Up'} />
            <FormWrapper>
                <form className="form-inner-wrapper" method="POST">
                    <InputWithLabel
                        name="email"
                        labelContent="Email Address:"
                        icon={'fas fa-envelope'}
                        inputType="email"
                        placeholder="Enter Your Email"
                        required="true"
                    />
                    <InputWithLabel
                        name="password"
                        labelContent="Password:"
                        icon={'fas fa-lock'}
                        inputType="password"
                        placeholder="Enter Your Password"
                        required="true"
                    />
                    <InputWithLabel
                        name="confirm-password"
                        labelContent="Confirm Password:"
                        icon={'fas fa-lock'}
                        inputType="password"
                        placeholder="Confirm Your Password"
                        required="true"
                    />
                    <Button content="Register" />
                </form>
            </FormWrapper>
        </div>
    );
}

export default SignUp;
