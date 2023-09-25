// todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    updateTodos: (state, action) => {
      return action.payload;
    },
    deleteTodos:()=>
    {

    }
  },
  
});
export const { setTodos, updateTodos } = todosSlice.actions;
export default todosSlice.reducer;
