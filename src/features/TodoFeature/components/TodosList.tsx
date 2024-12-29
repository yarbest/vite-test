import { useAppDispatch } from 'src/store'

import ListItem from './ListItem'
import styles from './styles.module.scss'

import { deleteListItem, editListItem, setIsEditingListItem } from '../store/todoListSlice'
import { EditListItemData, ListItemType } from '../types'

interface TodosListProps {
  listItems: ListItemType[]
}

const TodosList = ({ listItems }: TodosListProps) => {
  const dispatch = useAppDispatch()
  return (
    <ul className={styles.list}>
      {listItems.map(listItem => (
        <ListItem
          key={listItem.id}
          listItem={listItem}
          editListItem={(editListItemData: EditListItemData) => dispatch(editListItem(editListItemData))}
          deleteListItem={(id: string) => dispatch(deleteListItem(id))}
          setIsEditingListItem={(id: string, isEditing: boolean) => dispatch(setIsEditingListItem({ id, isEditing }))}
        />
      ))}
    </ul>
  )
}

export default TodosList
