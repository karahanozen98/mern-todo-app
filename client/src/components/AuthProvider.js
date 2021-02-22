import React, { useReducer, useEffect } from "react";
import makeLoginRequest from "./makeLoginRequest";

export const AuthContext = React.createContext();
export const DispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { currentUser: action.payload, isLoading: false };
    default:
      throw new Error("Action type not found: ", action.type);
  }
};
const initState = {
  currentUser: null,
  isLoading: true,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const token = localStorage.getItem("todouser");
    try {
      const { username, password } = JSON.parse(token);
      let err;
      if (username && password)
        err = makeLoginRequest(username, password, dispatch);
      if (err) localStorage.removeItem("todouser");
    } catch {
      localStorage.removeItem("todouser");
    }
  }, []);

  if (state.isLoading) return <h1>LOADING</h1>;
  else
    return (
      <AuthContext.Provider value={state.currentUser}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </AuthContext.Provider>
    );
}

export default AuthProvider;
