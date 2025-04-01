import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddForm() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("indoor");
  const dispatch = useDispatch();

  const submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(addTodo({ task, priority, category }));
    setTask("");
    setPriority("Medium");
    setCategory("indoor");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></input>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button>Add Task</button>
      </form>
    </>
  );
}
