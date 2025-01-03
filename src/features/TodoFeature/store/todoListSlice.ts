import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { todoApi } from './todoService'

import { EditListItemData, ListItemType } from '../types'

export interface TodoListState {
  listItems: ListItemType[]
  error: string | null
}

export const initialState: TodoListState = {
  listItems: [],
  error: null,
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
      const { id, text, isChecked } = action.payload
      const listItem = state.listItems.find(listItems => listItems.id === id)
      if (!listItem) return
      if (text) listItem.text = text
      if (isChecked) listItem.isChecked = !listItem.isChecked
    },
    setIsEditingListItem: (state, action: PayloadAction<{ id: string, isEditing: boolean }>) => {
      const listItem = state.listItems.find(listItems => listItems.id === action.payload.id)
      if (listItem) listItem.isEditing = action.payload.isEditing
    },
  },
  extraReducers: (builder) => {
    // for rtk query. when we getTodoById, we need to add it to local todos, here we listen to action with type:
    // 'todoApi/executeQuery/fulfilled'
    builder.addMatcher(todoApi.endpoints.getTodoById.matchFulfilled, (state, action) => {
      if (state.listItems.some(listItem => listItem.id === action.payload.id)) {
        state.error = 'Item already exists'
        return
      }
      state.listItems.push(action.payload)
      state.error = null
    })
    builder.addMatcher(todoApi.endpoints.getTodoById.matchPending, (state) => {
      state.error = null
    })
  },
})

export const { addListItem, deleteListItem, editListItem, setIsEditingListItem } = todoListSlice.actions
export const todoListReducer = todoListSlice.reducer

// for using thunk (asyncActions.ts)
// builder
// .addCase(fetchTodos.fulfilled, (state, action) => {
//   state.listItems.push({
//     id: action.payload.id.toString(),
//     text: action.payload.title,
//     isChecked: action.payload.completed,
//     isEditing: false,
//   })
//   state.error = null
//   state.isFetching = false
// })
// .addCase(fetchTodos.rejected, (state, action) => {
//   state.error = action.payload
//   state.isFetching = false
// })
// .addCase(fetchTodos.pending, (state) => {
//   state.isFetching = true
// })
// })
