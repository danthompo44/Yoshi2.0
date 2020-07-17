import React from 'react';

import Title from '../../components/title/title';
import InputField from '../../components/inputField/inputField';
import Button from '../../components/squareButton/squareButton';
import FormWrapper from '../../components/form-wrapper/form-wrapper';
import InputLabel from '../../components/inputField/inputLabel';

import './SignUp.css';

function SignUp() {
    return (
        <div className="sign-up-container">
            <Title title={"Sign Up"}/>
            <FormWrapper>
            <form class="form-inner-wrapper" method="POST">
                <InputLabel for="email" content="Email Address:"/>
                <InputField type="email" icon={"fas fa-envelope"} placeholder="Email Address" name="email"/>
                <InputLabel for="password" content="Password"/>
                <InputField type="password" icon={"fas fa-lock"} placeholder="Password" name="password"/>
                <InputLabel for="confirm-password" content="Confirm Password"/>
                <InputField type="password" icon={"fas fa-lock"} placeholder="Confirm Password" name="confirm-password"/>
                <Button content="Register"/>
            </form>
            </FormWrapper>      
        </div>
    );
}

export default SignUp;
