import React, { useContext } from "react";
import { AuthContext, DispatchContext } from "./AuthProvider";

function Home() {
  const currentUser = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div>
      {currentUser.username}
      <button
        onClick={() => {
          dispatch({ type: "LOGIN", payload: null });
          localStorage.removeItem("todouser");
        }}
      >Log out</button>
    </div>
  );
}

export default Home;
