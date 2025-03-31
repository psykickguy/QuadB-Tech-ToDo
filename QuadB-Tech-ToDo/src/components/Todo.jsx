import { useSelector, useDispatch } from "react-redux";
import AddForm from "./AddForm";
import { deleteTodo, marksAsDone } from "../features/todo/todoSlice";
import { logout } from "../features/auth/authSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
