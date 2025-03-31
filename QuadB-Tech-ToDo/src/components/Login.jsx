import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (evt) => {
    evt.preventDefault();
    console.log(username);
    dispatch(login({ username }));
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
}
