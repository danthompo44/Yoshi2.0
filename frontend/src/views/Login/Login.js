import React from "react";
import Title from '../../components/title/title';
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
}

export default Login;
