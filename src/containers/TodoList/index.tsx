import ListItem from './components/ListItem'
import styles from './TodoList.module.scss'
import InputForm from './components/InputForm'
import { useFilterListItems, useInputValue, useTodoList } from './hooks'
import Filters from './components/Filters'

const TodoList = () => {
  const { addListItem, deleteListItem, listItems, editListItem, setIsEditingListItem } = useTodoList()
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()
  const { filteredListItems, setFilterListType } = useFilterListItems(listItems)

  return (
    <>
      <InputForm
        addListItem={addListItem}
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
            editListItem={editListItem}
            deleteListItem={deleteListItem}
            setIsEditingListItem={setIsEditingListItem}
          />
        ))}
      </ul>
    </>
  )
}

export default TodoList
