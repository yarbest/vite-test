import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { paths } from 'src/routes/paths'

import { EditListItemData, FilterType, ListItemType } from './types'

// helps to remove logic from the component
export const useListItem = ({
  listItem, inputValue, editListItem, setIsEditingListItem, setInputValue, deleteListItem,
}: {
  listItem: ListItemType
  editListItem: (editListItemData: EditListItemData) => void
  setIsEditingListItem: (id: string, isEditing: boolean) => void
  setInputValue: (value: string) => void
  inputValue: string
  deleteListItem: (id: string) => void
},
) => {
  const navigate = useNavigate()

  const handleChecked = useCallback(() => {
    editListItem({ id: listItem.id, isChecked: true })
  }, [editListItem, listItem.id])

  const handleDeleteItemList = useCallback(() => {
    deleteListItem(listItem.id)
  }, [deleteListItem, listItem.id])

  const handleStartEditing = useCallback(() => {
    setIsEditingListItem(listItem.id, true)
    setInputValue(listItem.text)
  }, [listItem.id, setIsEditingListItem, setInputValue, listItem.text])

  const handleFinishEditing = useCallback(() => {
    setIsEditingListItem(listItem.id, false)
    editListItem({ id: listItem.id, text: inputValue })
    setInputValue('')
  }, [listItem.id, setIsEditingListItem, editListItem, inputValue, setInputValue])

  const navigateToTodo = useCallback(() => {
    navigate(`${paths.todos}/${listItem.id}`)
  }, [navigate, listItem.id])

  return {
    handleChecked,
    handleStartEditing,
    handleFinishEditing,
    handleDeleteItemList,
    navigateToTodo,
  }
}

export const useInputValue = () => {
  const [inputValue, setInputValue] = useState('')
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [])

  return { inputValue, handleChange, setInputValue }
}

interface FilterListItemsSearchParams {
  filter: FilterType
}

/**
 * Custom hook to manage typed URL search parameters.
 * Pass your type as a generic parameter to get/set typed search parameters.
 */
export const useTypedSearchParams = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getTypedSearchParams = useCallback((): Partial<T> => {
    const params: Partial<T> = {}
    searchParams.forEach((value, key) => {
      params[key as keyof T] = value as T[keyof T]
    })
    return params
  }, [searchParams])

  const setTypedSearchParam = useCallback((params: Partial<T>) => {
    const newSearchParams = new URLSearchParams(searchParams)
    Object.entries(params).forEach(([key, value]) => {
      newSearchParams.set(key, String(value))
    })
    setSearchParams(newSearchParams)
  }, [searchParams, setSearchParams])

  return { getTypedSearchParams, setTypedSearchParam }
}

export const useFilterListItems = (listItems: ListItemType[]) => {
  const { getTypedSearchParams, setTypedSearchParam } = useTypedSearchParams<FilterListItemsSearchParams>()
  const { filter } = getTypedSearchParams()

  let filteredListItems: ListItemType[]

  switch (filter) {
    case FilterType.ACTIVE:
      filteredListItems = listItems.filter(listItem => !listItem.isChecked)
      break
    case FilterType.COMPLETED:
      filteredListItems = listItems.filter(listItem => listItem.isChecked)
      break
    default:
      filteredListItems = listItems
  }

  const setFilterListType = useCallback((filter: FilterType) => {
    setTypedSearchParam({ filter })
  }, [setTypedSearchParam])

  return {
    filteredListItems,
    setFilterListType,
  }
}

// was replaced by store
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

  const editListItem = useCallback(({ id, text, isChecked: isCheckedUpdate }: EditListItemData) => {
    setListItems((prevListItems) => {
      return prevListItems.map(prevListItem => prevListItem.id === id
        ? {
            ...prevListItem,
            isChecked: isCheckedUpdate !== prevListItem.isChecked ? !prevListItem.isChecked : prevListItem.isChecked,
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
