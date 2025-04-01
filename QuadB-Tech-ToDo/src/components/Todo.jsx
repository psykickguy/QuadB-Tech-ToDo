import { useSelector, useDispatch } from "react-redux";
import AddForm from "./AddForm";
import { fetchWeather } from "../features/todo/todoSlice";
import { deleteTodo, marksAsDone } from "../features/todo/todoSlice";
import { logout } from "../features/auth/authSlice";
import { useEffect } from "react";

export default function Todo() {
  const todos = useSelector((state) => state.todos.todos);
  const { user } = useSelector((state) => state.auth);
  const { city } = useSelector((state) => state.auth);
  const { weather } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch]);

  const clickDelete = (id) => {
    console.log("delete", id);
    dispatch(deleteTodo(id));
  };

  const clickIsDone = (id) => {
    console.log("is done", id);
    dispatch(marksAsDone(id));
  };

  const clickLogout = () => {
    console.log("logged out");
    dispatch(logout());
  };

  const priorityColor = (priority) =>
    priority === "High"
      ? "red"
      : priority === "Medium"
      ? "orange"
      : priority === "Low"
      ? "yellow"
      : "white";

  return (
    <>
      <h2>Welcome! {user.username}!</h2>
      <AddForm />
      <h2>Todos List App</h2>
      <ul>
        {todos.map((todo) => (
          <li
            style={{
              borderLeft: `10px solid ${priorityColor(todo.priority)}`,
            }}
            key={todo.id}
          >
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            <span
              style={
                todo.category === "outdoor" ? { opacity: 1 } : { opacity: 0 }
              }
            >
              {weather ? weather.temp : "Loading..."}
            </span>
            <span style={{ color: priorityColor(todo.priority) }}>
              {todo.priority}
            </span>
            <button onClick={() => clickIsDone(todo.id)}>Mark As Done</button>
            <button onClick={() => clickDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clickLogout}>Logout</button>
    </>
  );
}
