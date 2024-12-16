import ListItem from './components/ListItem'
import styles from './TodoList.module.scss'
import InputForm from './components/InputForm'
import { useFilterListItems, useInputValue } from './hooks'
import Filters from './components/Filters'
import { useAppDispatch, useAppSelector } from 'src/store.ts'
import { addListItem, deleteListItem, editListItem, setIsEditingListItem } from './store/todoListSlice'
import { EditListItemData, ListItemType } from './types'
import { useCallback } from 'react'
import Button from './components/Button'
import { useLazyGetTodoByIdQuery } from './store/todoService'
import { selectListItems } from './store/selectors'
import { getErrorMessage } from './utils'

const TodoList = () => {
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()
  const {
    inputValue: searchTodoInputValue,
    handleChange: handleChangeSearchTodoInputValue,
    setInputValue: setSearchTodoInputValue,
  } = useInputValue()

  const listItems = useAppSelector(selectListItems)
  const dispatch = useAppDispatch()

  // useGetTodoByIdQuery - starts request right away, and on every render
  // const {data: listItems, error, isLoading: isFetching } = useGetTodoByIdQuery(Number(searchTodoInputValue))
  // useLazy - start, only when called
  // ===
  // {data} from hook, <- can't use this by default, cause its type is TodoFromAPI, not ListItemType[]
  // data can transformed in extraReducers in todoListSlice.ts on success
  // .addMatcher(todoApi.endpoints.getTodoById.matchFulfilled, (state, action) => {
  // or in service, field transformResmonse, same for error - transformErrorResponse
  // we don't use {data} from here, but below, when triggering request, cause then we add it to store,
  // and it need to happen only once, after user click
  const [getTodoById, { isLoading: isFetching, error }] = useLazyGetTodoByIdQuery()

  const { filteredListItems, setFilterListType } = useFilterListItems(listItems)

  const handleSearchTodo = useCallback(() => {
    // void dispatch(fetchTodos(Number(searchTodoInputValue))) // thunk. void - means that result of function
    // is not used. fetchTodos is promise and TS wants to have .catch here, but it's alredy inside the function

    void getTodoById(Number(searchTodoInputValue))
    setSearchTodoInputValue('')

    // const newListItem = (await getTodoById(Number(searchTodoInputValue))).data
    // a better option is to add fetched todo directly in extraReducers,
    // cause here it makes function async, and can't pass to props
    // if (newListItem) dispatch(addListItem(newListItem))
  }, [searchTodoInputValue, setSearchTodoInputValue, getTodoById])

  return (
    <>
      {error && <div>{getErrorMessage(error)}</div>}
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

// useEffect(() => {
//   throw new Error('Test error boundary')
// }, [])

export default TodoList
