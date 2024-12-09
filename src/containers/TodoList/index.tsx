import ListItem from './components/ListItem'
import styles from './TodoList.module.scss'
import InputForm from './components/InputForm'
import { useInputValue, useTodoList } from './hooks'

const TodoList = () => {
  const { addListItem, deleteListItem, listItems, editListItem, setIsEditingListItem } = useTodoList()
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()

  return (
    <>
      <InputForm
        addListItem={addListItem}
        inputValue={inputValue}
        onChange={handleChangeInputValue}
        setInputValue={setInputValue}
      />

      <ul className={styles.list}>
        {listItems.map(listItem => (
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
