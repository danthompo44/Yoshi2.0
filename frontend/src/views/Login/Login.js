import React from 'react';
import Title from '../../components/title/title';
<<<<<<< HEAD
import InputField from "../../components/inputField/inputField";
import SquareButton from '../../components/squareButton/squareButton';
import './Login.css';
import { Link } from "react-router-dom";

function Login() {
  return (
    <div id="login-container">
      <div id="sign-up-button-container">
        <Link to="/auth/sign-up">
          <SquareButton content="Sign Up"/>
        </Link>
      </div>
      <Title title={"Login"}/>
      <form id="login-form" method="GET">
        <>
        <InputField icon={"fas fa-envelope"} type="email" placeholder="Enter Your Email"/>
        <InputField icon={"fas fa-lock"} type="password" placeholder="Enter Your Password"/>
        <SquareButton content="Submit"/>
        </>
      </form>
    </div>
  );
=======
import InputField from '../../components/inputField/inputField';
import FormButton from '../../components/formButton/formButton';

function Login() {
    return (
        <div className="login">
            <Title title={'Login'} />
            <form>
                <InputField
                    icon={'fas fa-envelope'}
                    type="email"
                    placeholder="Enter Your Email"
                />
                <InputField
                    icon={'fas fa-lock'}
                    type="password"
                    placeholder="Enter Your Password"
                />
                <FormButton content="Submit"></FormButton>
            </form>
        </div>
    );
>>>>>>> 1bb4ff954a1166ae2070ac349ff5dd02b090ab2a
}

export default Login;
