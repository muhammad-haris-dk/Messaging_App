import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  theme: "light",
  isloggedin: false,
  loading: true,
};

const Slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (state, action) => {
      const { key, User_data } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.key === key);
      state.todoList[index].User_data = User_data;
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].completed = !state.todoList[index].completed;
    },
    theme_toggle_dynamic: (state,action) => {
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
    conditional_Public_Private: (state, action) => {
      state.isloggedin = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
  theme_toggle_dynamic,
  conditional_Public_Private,
  loading,
} = Slice.actions;

export default Slice.reducer;
