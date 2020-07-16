import React from "react";
import Title from '../../components/title/title';
import InputField from "../../components/inputField/inputField";
import Button from '../../components/formButton/formButton';

function Login() {
  return (
    <div className="login">
      <Title title={"Login"}/>
      <form>
        <>
        <InputField icon={"fas fa-envelope"} type="email" placeholder="Enter Your Email"/>
        <InputField icon={"fas fa-lock"} type="password" placeholder="Enter Your Password"/>
        <Button content="Submit"></Button>
        </>
      </form>
    </div>
  );
}

export default Login;
