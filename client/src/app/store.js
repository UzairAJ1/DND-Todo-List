import { configureStore } from "@reduxjs/toolkit";

import todosReducer from '../features/todos/todo-slice'
export const store = configureStore({
  reducer: {
    todos: todosReducer },
});