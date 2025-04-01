import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          id="task"
          label="task"
          variant="outlined"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <TextField
          id="category"
          select
          label="Select"
          helperText="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="indoor">Indoor</MenuItem>
          <MenuItem value="outdoor">Outdoor</MenuItem>
        </TextField>
        <TextField
          id="priority"
          select
          label="Select"
          helperText="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </Box>
    </>
  );
}
