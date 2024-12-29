import { RootState } from 'src/store'

export const selectListItems = (state: RootState) => state.todoList.listItems
export const selectError = (state: RootState) => state.todoList.error
