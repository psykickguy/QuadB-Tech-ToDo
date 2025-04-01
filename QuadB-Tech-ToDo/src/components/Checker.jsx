import Todo from "./Todo";
import Login from "./Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/todo/todoSlice";

export default function Checker() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const city = useSelector((state) => state.auth.city);

  useEffect(() => {
    if (isAuthenticated && city) {
      dispatch(fetchWeather(city));
    }
  }, [isAuthenticated, city, dispatch]);

  return isAuthenticated ? <Todo /> : <Login />;
}
