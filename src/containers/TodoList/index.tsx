import ListItem from './components/ListItem'
import styles from './TodoList.module.scss'
import InputForm from './components/InputForm'
import { useTodoList } from './hooks'

export interface ListItemType {
  text: string
  isChecked: boolean
  id: string
}

const TodoList = () => {
  const { addListItem, deleteListItem, listItems, onChecked } = useTodoList()
  return (
    <>
      <InputForm addListItem={addListItem} />

      <ul className={styles.list}>
        {listItems.map(listItem => (
          <ListItem
            key={listItem.id}
            listItem={listItem}
            onChecked={onChecked}
          />
        ))}
      </ul>
    </>
  )
}

export default TodoList
