import { useCallback } from 'react'

import { useInputValue } from '@shared/hooks'
import { Filters, InputForm } from '@shared/ui'
import { getErrorMessage } from '@shared/utils/api'
import { useAppDispatch, useAppSelector } from 'src/store.ts'

import ListItem from './components/ListItem'
import { useFilterListItems } from './hooks'
import { selectError, selectListItems } from './store/selectors'
import { addListItem, deleteListItem, editListItem, setIsEditingListItem } from './store/todoListSlice'
import { useLazyGetTodoByIdQuery } from './store/todoService'
import styles from './styles.module.scss'
import { EditListItemData } from './types'

const TodosPage = () => {
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
      <div>
        {fetchingError && <span>{getErrorMessage(fetchingError)}</span>}
        {error && <span>{error}</span>}
        {isFetching && <span>Loading...</span>}
      </div>

      <InputForm
        onAddListItem={handleSearchTodo}
        inputValue={searchTodoInputValue}
        onChange={handleChangeSearchTodoInputValue}
        isFromApi
        testIds={{ input: 'search-input-form', button: 'search-button-form' }}
      />

      <InputForm
        onAddListItem={handleAddCustomListItem}
        inputValue={inputValue}
        onChange={handleChangeInputValue}
      />

      <Filters onFilterChange={setFilterListType} />

      <ul className={styles.list}>
        {filteredListItems.map(listItem => (
          <ListItem
            key={listItem.id}
            listItem={listItem}
            editListItem={(editListItemData: EditListItemData) => dispatch(editListItem(editListItemData))}
            deleteListItem={(id: string) => dispatch(deleteListItem(id))}
            setIsEditingListItem={(id: string, isEditing: boolean) => dispatch(setIsEditingListItem({ id, isEditing }))}
          />
        ))}
      </ul>
    </>
  )
}

// useEffect(() => {
//   throw new Error('Test error boundary')
// }, [])

export default TodosPage
