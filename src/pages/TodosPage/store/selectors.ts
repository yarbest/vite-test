import { RootState } from 'src/store'

export const selectListItems = (state: RootState) => state.todoList.listItems
export const selectIsFetching = (state: RootState) => state.todoList.isFetching
