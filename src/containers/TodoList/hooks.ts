import { useCallback, useState } from 'react'
import { ListItemType } from '.'

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

  const onChecked = useCallback((id: string) => {
    setListItems((prevListItems) => {
      return prevListItems.map(prevListItem => prevListItem.id === id
        ? {
            ...prevListItem,
            isChecked: !prevListItem.isChecked,
          }
        : prevListItem,
      )
    })
  }, [])
  return { listItems, addListItem, deleteListItem, onChecked }
}
