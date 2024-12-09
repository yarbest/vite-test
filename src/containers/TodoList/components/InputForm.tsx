import React, { useCallback } from 'react'
import Button from './Button'
import { ListItemType } from '../types'

// Props overloading
// This means, if isEditing is passed, then addListItem is prohibited
// and vice versa, so only one of these props can be passed, everything from InputFormPropsCommon can be passed
interface InputFormPropsEdit {
  isEditing: boolean
  addListItem?: never
}
interface InputFormPropsSubmit {
  addListItem: (newListItem: ListItemType) => void
  isEditing?: never
}
interface InputFormPropsCommon {
  inputValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  setInputValue?: (value: string) => void
}

type InputFormProps = InputFormPropsCommon & (InputFormPropsEdit | InputFormPropsSubmit)

const InputForm = ({ addListItem, isEditing = false, inputValue = '', onChange, setInputValue }: InputFormProps) => {
  const handleAddListItem = useCallback(() => {
    if (addListItem) addListItem({ id: Math.random().toString(), text: inputValue, isChecked: false })
    setInputValue?.('')
  }, [addListItem, inputValue, setInputValue])

  return (
    <>
      <input value={inputValue} onChange={onChange} />
      {!isEditing && <Button label="Add" onClick={handleAddListItem} />}
    </>
  )
}

export default InputForm
