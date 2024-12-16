import Button from './Button'
import Checkbox from './Checkbox'
import InputForm from './InputForm'
import styles from './styles.module.scss'

import { EditListItemData, ListItemType } from '../types'
import { useInputValue, useListItem } from '../hooks'

interface ListItemProps {
  listItem: ListItemType
  editListItem: (editListItemData: EditListItemData) => void
  setIsEditingListItem: (id: string, isEditing: boolean) => void
  deleteListItem: (id: string) => void
}

const ListItem = ({ listItem, editListItem, deleteListItem, setIsEditingListItem }: ListItemProps) => {
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()

  const {
    handleChecked,
    handleFinishEditing,
    handleStartEditing,
    handleDeleteItemList,
    navigateToTodo,
  } = useListItem({ listItem, editListItem, setIsEditingListItem, setInputValue, inputValue, deleteListItem })

  return (
    <li className={styles.listItem}>
      <Checkbox
        isChecked={listItem.isChecked}
        onChecked={handleChecked}
      />

      {listItem.isEditing
        ? (
            <InputForm
              isEditing
              inputValue={inputValue}
              onChange={handleChangeInputValue}
            />
          )
        : <span className={styles.listItemText} onClick={navigateToTodo}>{listItem.text}</span>}

      <Button
        label={listItem.isEditing ? 'Submit' : 'Edit'}
        onClick={listItem.isEditing ? handleFinishEditing : handleStartEditing}
      />

      <Button
        label="Delete"
        onClick={handleDeleteItemList}
      />
    </li>
  )
}

export default ListItem
