import { useInputValue, useListItem } from '../hooks'
import { EditListItemData, ListItemType } from '../types'
import Button from './Button'
import Checkbox from './Checkbox'
import InputForm from './InputForm'

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
  } = useListItem({ listItem, editListItem, setIsEditingListItem, setInputValue, inputValue, deleteListItem })

  return (
    <li>
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
              setInputValue={setInputValue}
            />
          )
        : listItem.text}

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
