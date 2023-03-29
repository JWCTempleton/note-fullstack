import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import noteService from "../services/notes";
import registerService from "../services/register";
import { useState } from "react";

const LoginPage = ({
  setUser,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const newUser = await registerService.create({
        name,
        username,
        password,
      });
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setName("");
      navigate("/notes");
    } catch {
      console.log("error");
    }
  };

  const [name, setName] = useState("");
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSignUp}>
        <div>
          name{" "}
          <input
            type="text"
            id="name"
            value={name}
            name="Username"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          username{" "}
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          sign up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
