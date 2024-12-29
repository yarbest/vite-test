import { useCallback } from 'react'

import { useInputValue } from '@shared/hooks'
import { Filters, InputForm } from '@shared/ui'
import { useAppDispatch, useAppSelector } from 'src/store.ts'

import ListItemFetchingStatus from './components/ListItemFetchingStatus'
import TodosList from './components/TodosList'
import { useFilterListItems } from './hooks'
import { selectError, selectListItems } from './store/selectors'
import { addListItem } from './store/todoListSlice'
import { useLazyGetTodoByIdQuery } from './store/todoService'

const TodoFeature = () => {
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()
  const {
    inputValue: searchTodoInputValue,
    handleChange: handleChangeSearchTodoInputValue,
    setInputValue: setSearchTodoInputValue,
  } = useInputValue()

  const listItems = useAppSelector(selectListItems)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  // useGetTodoByIdQuery - starts request right away, and on every render. useLazy - start, only when called
  const [getTodoById, { error: fetchingError, isFetching }] = useLazyGetTodoByIdQuery()

  const { filteredListItems, setFilterListType } = useFilterListItems(listItems)

  const handleSearchTodo = useCallback(() => {
    if (!searchTodoInputValue) return
    void getTodoById(Number(searchTodoInputValue))
    setSearchTodoInputValue('')
  }, [searchTodoInputValue, setSearchTodoInputValue, getTodoById])

  const handleAddCustomListItem = useCallback(() => {
    if (inputValue) dispatch(addListItem({ id: Math.random().toString(), text: inputValue, isChecked: false }))
    setInputValue?.('')
  }, [dispatch, inputValue, setInputValue])

  return (
    <>
      <ListItemFetchingStatus fetchingError={fetchingError} error={error} isFetching={isFetching} />

      <InputForm
        mode="add"
        onAddListItem={handleSearchTodo}
        inputValue={searchTodoInputValue}
        onChange={handleChangeSearchTodoInputValue}
        isFromApi
        testIds={{ input: 'search-input-form', button: 'search-button-form' }}
      />

      <InputForm
        mode="add"
        onAddListItem={handleAddCustomListItem}
        inputValue={inputValue}
        onChange={handleChangeInputValue}
      />

      <Filters onFilterChange={setFilterListType} />

      <TodosList listItems={filteredListItems} />

    </>
  )
}

// useEffect(() => {
//   throw new Error('Test error boundary')
// }, [])

export default TodoFeature
