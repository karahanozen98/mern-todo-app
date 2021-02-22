const makeLoginRequest = async (username, password, dispatch) => {
  try {
    const response = await fetch(
      `https://karahantodoapp.herokuapp.com/api/user/${username}/${password}`
    );
    const user = await response.json();
    console.log(user);
    if (user) {
      console.log(user);
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("todouser", JSON.stringify({ username, password }));
    } else return "User Not Found";
  } catch (err) {
    return err;
  }
};

export default makeLoginRequest;
