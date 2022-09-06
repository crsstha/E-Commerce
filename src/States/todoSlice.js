import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todolist',
  initialState: {
    taskList: []
  },
  reducers: {
    addToDo : (state , action) => {
        return {
            ...state,
            loading : false,
            taskList: [...state.taskList,action.payload]
        }
    },
    removeToDo : () => {
        return {
            loading : false,
            taskList: []
        }
    },
    deleteToDo : (state , action) => {
        const newTask = state.taskList.filter((val) => val.id !== action.payload);
        return{
            loading: false,
            taskList : newTask,
        }
    }
  },
})

export const {  addToDo ,removeToDo , deleteToDo} = todoSlice.actions
export default todoSlice.reducer