import { useCallback } from 'react'
import { EditListItemData, ListItemType } from '../types'
import Button from './Button'
import Checkbox from './Checkbox'
import InputForm from './InputForm'
import { useInputValue } from '../hooks'

interface ListItemProps {
  listItem: ListItemType
  editListItem: (editListItemData: EditListItemData) => void
  setIsEditingListItem: (id: string, isEditing: boolean) => void
  deleteListItem: (id: string) => void
}

const ListItem = ({ listItem, editListItem, deleteListItem, setIsEditingListItem }: ListItemProps) => {
  const { inputValue, handleChange: handleChangeInputValue, setInputValue } = useInputValue()

  const handleChecked = useCallback(() => {
    editListItem({ id: listItem.id, isCheckChanged: true })
  }, [editListItem, listItem.id])

  const handleStartEditing = useCallback(() => {
    setIsEditingListItem(listItem.id, true)
    setInputValue(listItem.text)
  }, [listItem.id, setIsEditingListItem, setInputValue, listItem.text])

  const handleFinishEditing = useCallback(() => {
    setIsEditingListItem(listItem.id, false)
    editListItem({ id: listItem.id, text: inputValue })
    setInputValue('')
  }, [listItem.id, setIsEditingListItem, editListItem, inputValue, setInputValue])

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
        onClick={() => deleteListItem(listItem.id)}
      />
    </li>
  )
}

export default ListItem
