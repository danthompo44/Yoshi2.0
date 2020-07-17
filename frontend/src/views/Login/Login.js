import React from 'react';

import Title from '../../components/title/title';
import InputField from "../../components/inputField/inputField";
import InputLabel from '../../components/inputField/inputLabel';
import SquareButton from '../../components/squareButton/squareButton';

import './Login.css';
import '../../App.css';
import { Link } from 'react-router-dom';


function Login() {
  return (
    <div id="login-container">
      <Title title={"Login"}/>
      <FormWrapper>
        <form class="form-inner-wrapper" method="GET">
          <>
          <InputLabel for="email" content="Email Address:"/>
          <InputField icon={"fas fa-envelope"} type="email" placeholder="Enter Your Email" name="email"/>
          <InputLabel for="password" content="Password:"/>
          <InputField icon={"fas fa-lock"} type="password" placeholder="Enter Your Password" name="password"/>
          <SquareButton content="Login"/>
          <Link id="forgotten-password">Forgotten Password?</Link>
          </>
        </form>
        <Link to="/auth/sign-up"  id="sign-up-link">No account? Sign Up</Link>
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
