import { useSelector, useDispatch } from "react-redux";
import AddForm from "./AddForm";
import { fetchWeather } from "../features/todo/todoSlice";
import { deleteTodo, marksAsDone } from "../features/todo/todoSlice";
import { logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

export default function Todo() {
  const todos = useSelector((state) => state.todos.todos);
  const { city } = useSelector((state) => state.auth);
  const { weather } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [dispatch, city]);

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
      <h2>Welcome!</h2>
      <AddForm />
      <h2>Todos List App</h2>
      <List sx={{ width: "100%" }}>
        {todos.map((todo) => (
          <ListItem
            style={{
              borderLeft: `10px solid ${priorityColor(todo.priority)}`,
            }}
            key={todo.id}
            disablePadding
          >
            <ListItemButton dense>
              <span
                style={
                  todo.isDone ? { textDecorationLine: "line-through" } : {}
                }
              >
                {todo.task}
              </span>
              &nbsp; &nbsp;
              <span
                style={
                  todo.category === "outdoor" ? { opacity: 1 } : { opacity: 0 }
                }
              >
                {weather ? weather.temp : "Loading..."}°C
              </span>
              &nbsp; &nbsp;
              <span style={{ color: priorityColor(todo.priority) }}>
                {todo.priority}
              </span>{" "}
              &nbsp; &nbsp; &nbsp;
              <Button
                type="button"
                variant="outlined"
                onClick={() => clickIsDone(todo.id)}
              >
                Mark As Done
              </Button>
              &nbsp; &nbsp;
              <Button
                type="button"
                variant="contained"
                onClick={() => clickDelete(todo.id)}
              >
                Delete
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button type="button" variant="contained" onClick={clickLogout}>
        Logout
      </Button>
    </>
  );
}
