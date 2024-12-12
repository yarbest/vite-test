import ListItem from './components/ListItem'
import styles from './TodoList.module.scss'
import InputForm from './components/InputForm'
import { useFilterListItems, useInputValue } from './hooks'
import Filters from './components/Filters'
import { selectHasError, selectIsFetching, selectListItems } from './store/selectors'
import { useAppDispatch, useAppSelector } from 'src/store.ts'
import { addListItem, deleteListItem, editListItem, setIsEditingListItem } from './store/todoListSlice'
import { EditListItemData, ListItemType } from './types'
import { useCallback } from 'react'
import Button from './components/Button'
import { fetchTodos } from './store/asyncActions'

const TodoList = () => {
  const listItems = useAppSelector(selectListItems)
  const isFetching = useAppSelector(selectIsFetching)
  const error = useAppSelector(selectHasError)
  const dispatch = useAppDispatch()

  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()
  const {
    inputValue: searchTodoInputValue,
    handleChange: handleChangeSearchTodoInputValue,
    setInputValue: setSearchTodoInputValue,
  } = useInputValue()
  const { filteredListItems, setFilterListType } = useFilterListItems(listItems)

  const handleSearchTodo = useCallback(() => {
    // void - means that result of function is not used
    //  fetchTodos is promise and TS wants to have .catch here, but it's alredy inside the function
    void dispatch(fetchTodos(Number(searchTodoInputValue)))
    setSearchTodoInputValue('')//
  }, [dispatch, searchTodoInputValue, setSearchTodoInputValue])

  return (
    <>
      {error && <div>{error}</div>}
      {isFetching && <div>Loading...</div>}

      <input type="number" min={1} value={searchTodoInputValue} onChange={handleChangeSearchTodoInputValue} />
      <Button label="Add from api" onClick={handleSearchTodo} />

      <InputForm
        addListItem={(newListItem: ListItemType) => dispatch(addListItem(newListItem))}
        inputValue={inputValue}
        onChange={handleChangeInputValue}
        setInputValue={setInputValue}
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

// was replaced by store
// const { addListItem, deleteListItem, listItems, editListItem, setIsEditingListItem } = useTodoList()

// useEffect(() => {
//   throw new Error('Test error boundary')
// }, [])

export default TodoList
