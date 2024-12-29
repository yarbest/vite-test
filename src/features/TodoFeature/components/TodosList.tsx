import { useCallback } from 'react'

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

  const handleEditListItem = useCallback(
    (editListItemData: EditListItemData) => dispatch(editListItem(editListItemData)),
    [dispatch],
  )
  const handleDeleteListItem = useCallback(
    (id: string) => dispatch(deleteListItem(id)),
    [dispatch],
  )
  const handleSetIsEditingListItem = useCallback(
    (id: string, isEditing: boolean) => dispatch(setIsEditingListItem({ id, isEditing })),
    [dispatch],
  )

  return (
    <ul className={styles.list}>
      {listItems.map(listItem => (
        <ListItem
          key={listItem.id}
          listItem={listItem}
          editListItem={handleEditListItem}
          deleteListItem={handleDeleteListItem}
          setIsEditingListItem={handleSetIsEditingListItem}
        />
      ))}
    </ul>
  )
}

export default TodosList
