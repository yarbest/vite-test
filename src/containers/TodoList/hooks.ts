import { useCallback, useState } from 'react'
import { EditListItemData, ListItemType } from './types'

export const useTodoList = () => {
  const [listItems, setListItems] = useState<ListItemType[]>([
    { text: 'Buy milk', isChecked: false, id: '1' },
    { text: '2 milk', isChecked: false, id: '2' },
    { text: '3 milk', isChecked: false, id: '3' },
  ])

  const addListItem = useCallback((newListItem: ListItemType) => {
    setListItems(prevListItems => [...prevListItems, newListItem])
  }, [])

  const deleteListItem = useCallback((id: string) => {
    setListItems(prevListItems => prevListItems.filter(prevListItem => prevListItem.id !== id))
  }, [])

  const editListItem = useCallback(({ id, text, isCheckChanged }: EditListItemData) => {
    setListItems((prevListItems) => {
      return prevListItems.map(prevListItem => prevListItem.id === id
        ? {
            ...prevListItem,
            isChecked: isCheckChanged ? !prevListItem.isChecked : prevListItem.isChecked,
            text: text ? text : prevListItem.text,
          }
        : prevListItem,
      )
    })
  }, [])

  const setIsEditingListItem = useCallback((id: string, isEditing: boolean) => {
    setListItems(prevListItems =>
      prevListItems.map(prevListItem => prevListItem.id === id ? { ...prevListItem, isEditing } : prevListItem),
    )
  }, [])

  return { listItems, addListItem, deleteListItem, editListItem, setIsEditingListItem }
}

export const useInputValue = () => {
  const [inputValue, setInputValue] = useState('')
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [])

  return { inputValue, handleChange, setInputValue }
}
