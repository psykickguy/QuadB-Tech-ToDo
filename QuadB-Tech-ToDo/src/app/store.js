import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import authReducer from "../features/auth/authSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
