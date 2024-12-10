import { createAsyncThunk } from '@reduxjs/toolkit'

interface TodoFromAPI {
  userId: number
  id: number
  title: string
  completed: boolean
}
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodosById',
  async (todoId: number, thunkApi) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      if (!response.ok) throw new Error('Server error') // 404 is not an error, so we need to throw an error manually
      const data = await response.json() as TodoFromAPI
      return data
    }
    catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('Couldn\'t load todo')
    }
  },
)
