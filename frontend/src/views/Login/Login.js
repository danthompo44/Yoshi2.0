import React from "react";
import Title from '../../components/title/title';
import InputField from "../../components/inputField/inputField";

function Login() {
  return (
    <div className="login">
      <Title title={"Login"}/>
      <InputField />
    </div>
  );
}

export default Login;
