import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { fetchWeather } from "../features/todo/todoSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (evt) => {
    evt.preventDefault();
    dispatch(login({ username, city }));
    dispatch(fetchWeather(city));
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
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
}
