import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import { useDispatch } from "react-redux";
import { deleteTodo, marksAsDone } from "../features/todo/todoSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const dispatch = useDispatch();

  const clickDelete = (id) => {
    console.log("delete", id);
    dispatch(deleteTodo(id));
  };

  const clickIsDone = (id) => {
    console.log("is done", id);
    dispatch(marksAsDone(id));
  };

  return (
    <>
      <AddForm />
      <h2>Todos List App</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            <button onClick={() => clickIsDone(todo.id)}>Mark As Done</button>
            <button onClick={() => clickDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
