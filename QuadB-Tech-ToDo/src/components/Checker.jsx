import Todo from "./Todo";
import Login from "./Login";
import { useSelector } from "react-redux";

export default function Checker() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated === true ? <Todo /> : <Login />;
}
