import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { todoListReducer } from '@containers/TodoList/todoListSlice'

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
