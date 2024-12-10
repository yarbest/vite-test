import ListItem from './components/ListItem'
import styles from './TodoList.module.scss'
import InputForm from './components/InputForm'
import { useFilterListItems, useInputValue } from './hooks'
import Filters from './components/Filters'
import { selectListItems } from './selectors'
import { useAppDispatch, useAppSelector } from 'src/store.ts'
import { addListItem, deleteListItem, editListItem, fetchTodos, setIsEditingListItem } from './todoListSlice'
import { EditListItemData, ListItemType } from './types'
import { useEffect } from 'react'

const TodoList = () => {
  const listItems = useAppSelector(selectListItems)
  const dispatch = useAppDispatch()

  // const { addListItem, deleteListItem, listItems, editListItem, setIsEditingListItem } = useTodoList()
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()
  const { filteredListItems, setFilterListType } = useFilterListItems(listItems)

  useEffect(() => {
    // void - means that result of function is not used
    //  fetchTodos is promise and TS wants to have .catch here, but it's alredy inside the function
    void dispatch(fetchTodos(1))
  }, [dispatch])

  // useEffect(() => {
  //   throw new Error('Test error boundary')
  // }, [])
  return (
    <>
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

export default TodoList
