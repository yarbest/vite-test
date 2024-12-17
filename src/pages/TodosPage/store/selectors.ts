import { RootState } from 'src/store'

export const selectListItems = (state: RootState) => state.todoList.listItems
