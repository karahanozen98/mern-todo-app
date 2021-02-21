import React, { useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import Home from "./components/Home";
import Unauthorized from "./components/Unauthorized";
import "./App.css";

function App() {
  const currentUser = useContext(AuthContext);
  if (currentUser) return <Home />;
  else return <Unauthorized />;
}

export default App;
