import React, { useCallback, useState } from 'react'
import { ListItemType } from '..'
import Button from './Button'

interface InputFormProps {
  addListItem: (newListItem: ListItemType) => void
}

const InputForm = ({ addListItem }: InputFormProps) => {
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onButtonClick = useCallback(() => {
    addListItem({ id: Math.random().toString(), text: inputValue, isChecked: false })
    setInputValue('')
  }, [addListItem, inputValue])

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      <Button label="Add" onClick={onButtonClick} />
    </div>
  )
}

export default InputForm
