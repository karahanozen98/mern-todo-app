import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

function Unauthorized() {
  const [tab, setTab] = useState(0);

  return (
    <SignInWrapper>
      {tab === 0 ? <Login setTab={setTab} /> : <Signup setTab={setTab} />}
    </SignInWrapper>
  );
}

export default Unauthorized;

const SignInWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

  .signin-container {
    background: #ddd;
    display: flex;
    flex-direction: column;
    padding: 40px;
  }
  input,
  button {
    margin: 10px;
  }
`;
