import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { fetchWeather } from "../features/todo/todoSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        &nbsp; &nbsp;
        <TextField
          id="city"
          label="city"
          variant="outlined"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        &nbsp; &nbsp;
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
}
