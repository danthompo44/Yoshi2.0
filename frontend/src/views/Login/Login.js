import React from 'react';
import { Link } from 'react-router-dom';


import Title from '../../components/title/title';
import InputFieldWithLabel from '../../components/inputField/inputFieldWithLabel';
import SquareButton from '../../components/squareButton/squareButton';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

import './Login.css';


function Login() {
  return (
    <div id="login-container">
      <Title title={"Login"}/>
      <FormWrapper>
        <form class="form-inner-wrapper" method="GET">
          <>
          <InputFieldWithLabel name="email" labelContent="Email Address:" icon ={"fas fa-envelope"} inputType="email" placeholder="Enter Your Email"/>
          <InputFieldWithLabel name="password" labelContent="Password:" icon ={"fas fa-lock"} inputType="password" placeholder="Enter Your Password"/>
          <SquareButton content="Login"/>
          <Link id="forgotten-password">Forgotten Password?</Link>
          </>
        </form>
        <Link to="/auth/sign-up"  id="sign-up-link">No account? Sign Up</Link>
      </FormWrapper>
    </div>
  );
}



export default Login;
