import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d70bca13a45895b965277d1115327ba2";

const fetchWeather = createAsyncThunk("todos/fetchWeather", async (city) => {
  const response = await fetch(
    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  let jsonResponse = await response.json();
  let result = {
    city: city,
    temp: jsonResponse.main.temp,
  };
  console.log(result);

  return result;
});

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [
    { id: "abc", task: "demo-task", isDone: false, priority: "Medium" },
  ],
  loading: "idle",
  weather: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        task: action.payload.task,
        isDone: false,
        priority: action.payload.priority,
        category: action.payload.category,
      };
      if (action.payload.task !== "") {
        state.todos.push(newTodo);
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    marksAsDone: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: true };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = "success";
      state.weather = action.payload;
    });
  },
});

export { fetchWeather };
export const { addTodo, deleteTodo, marksAsDone } = todoSlice.actions;
export default todoSlice.reducer;
