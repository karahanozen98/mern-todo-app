import React, { useContext, useState } from "react";
import { Input, Button } from "@material-ui/core";
import { DispatchContext } from "./AuthProvider";
import makeLoginRequest from "./makeLoginRequest";

const Login = ({ setTab }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useContext(DispatchContext);

  const handleLogin = async () => {
    const err = await makeLoginRequest(username, password, dispatch);
    if (err) alert(err);
  };

  return (
    <div className="signin-container">
      <h1>Login</h1>
      <Input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Button variant="contained" color="primary" onClick={() => handleLogin()}>
        Login
      </Button>
      <p>Don't have an account?</p>
      <Button onClick={() => setTab(1)}>Sign Up</Button>
    </div>
  );
};

export default Login;
