import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FilterType, ListItemType, EditListItemData } from './types'

export interface TodoListState {
  listItems: ListItemType[]
  filterType: FilterType
}

const initialState: TodoListState = {
  listItems: [],
  filterType: FilterType.ALL,
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addListItem: (state, action: PayloadAction<ListItemType>) => {
      state.listItems.push(action.payload)
    },
    deleteListItem: (state, action: PayloadAction<string>) => {
      state.listItems.splice(state.listItems.findIndex(listItem => listItem.id === action.payload), 1)
    },
    editListItem: (state, action: PayloadAction<EditListItemData>) => {
      const { id, text, isCheckChanged } = action.payload
      const listItem = state.listItems.find(listItems => listItems.id === id)
      if (!listItem) return
      if (text) listItem.text = text
      if (isCheckChanged) listItem.isChecked = !listItem.isChecked
    },
    setIsEditingListItem: (state, action: PayloadAction<{ id: string, isEditing: boolean }>) => {
      const listItem = state.listItems.find(listItems => listItems.id === action.payload.id)
      if (listItem) listItem.isEditing = action.payload.isEditing
    },
  },
})

interface TodoFromAPI {
  userId: number
  id: number
  title: string
  completed: boolean
}
export const fetchTodos = createAsyncThunk(
  'todos/fetchById',
  async (todoId: number, thunkApi) => {
    // return fetch(`https://jsonplaceholder.typicode.com/todos/${1111}`)
    //   .then(response => response.json() as Promise<TodoFromAPI>)
    //   .then(data => data)
    //   .catch(() => thunkApi.rejectWithValue('Couldn"t load todo'))

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      // 404 is not an error, so we need to throw an error manually
      if (!response.ok) throw new Error('Server error')
      const data = await response.json() as TodoFromAPI
      return data
    }
    catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('Couldn"t load todo')
    }
  },
)

export const { addListItem, deleteListItem, editListItem, setIsEditingListItem } = todoListSlice.actions
export const todoListReducer = todoListSlice.reducer
