import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { todoListReducer } from '@pages/TodosPage/store/todoListSlice'
import { todoApi } from '@pages/TodosPage/store/todoService'

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  // for rtk query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(todoApi.middleware)
  },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// setupListeners(store.dispatch)

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
