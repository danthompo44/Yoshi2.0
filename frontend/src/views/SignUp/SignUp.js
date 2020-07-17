import React from "react";
import Title from '../../components/title/title';
import InputField from '../../components/inputField/inputField';
import Button from '../../components/squareButton/squareButton';

import './SignUp.css';

function SignUp() {
    return (
        <div className="sign-up-container">
            <Title title={"Sign Up"}/>
            <form id="sign-up-form" method="POST">
                <InputField type="email" icon={"fas fa-envelope"} placeholder="Email Address"/>
                <InputField type="password" icon={"fas fa-lock"} placeholder="Password"/>
                <InputField type="password" icon={"fas fa-lock"} placeholder="Confirm Password"/>
                <Button content="Register"/>
            </form>
        </div>
    );
}

export default SignUp;
