import React, { useContext, useState } from "react";
import { Input, Button } from "@material-ui/core";
import { DispatchContext } from "./AuthProvider";
import makeLoginRequest from "./makeLoginRequest";

const Signup = ({ setTab }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const dispatch = useContext(DispatchContext);

  const createAccount = () => {
    if ((username, password, passwordAgain)) {
      const body = JSON.stringify({ username, password });

      fetch("http://localhost:5500/api/user/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: body,
      })
        .then((response) => {
          if (response.status === 200) {
            makeLoginRequest(username, password, dispatch);
          } else {
            alert("Error");
          }
        })
        .catch((err) => {
          alert("Error", err);
        });
    } else alert("Fill all areas");
  };

  return (
    <div className="signin-container">
      <h1>Sign Up</h1>
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
      <Input
        value={passwordAgain}
        type="password"
        placeholder="Password Again"
        onChange={(e) => setPasswordAgain(e.target.value)}
      ></Input>
      <Button
        variant="contained"
        color="primary"
        disabled={password !== passwordAgain}
        onClick={() => createAccount()}
      >
        Create a account
      </Button>
      <p>Already have an account?</p>
      <Button onClick={() => setTab(0)}>Log in</Button>
    </div>
  );
};
export default Signup;
