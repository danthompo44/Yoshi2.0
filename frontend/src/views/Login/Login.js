import React from 'react';
import { Link } from "react-router-dom";

import Title from '../../components/title/title';
import InputField from "../../components/inputField/inputField";
import SquareButton from '../../components/squareButton/squareButton';

import './Login.css';
import '../../App.css';


function Login() {
  return (
    <div id="login-container">
      <Title title={"Login"}/>
      <FormWrapper>
        <form class="form-inner-wrapper" method="GET">
          <>
          <InputField icon={"fas fa-envelope"} type="email" placeholder="Enter Your Email"/>
          <InputField icon={"fas fa-lock"} type="password" placeholder="Enter Your Password"/>
          <SquareButton content="Submit"/>
          </>
        </form>
        </FormWrapper>
    </div>
  );
}

function FormWrapper({children}) {
  return (
    <div className="form-wrapper">
      {children}
    </div>
  )
}

export default Login;
