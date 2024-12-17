// import { configureStore } from '@reduxjs/toolkit'

import { EditListItemData, ListItemType } from '../../types'
import { addListItem, todoListReducer, initialState, deleteListItem, editListItem } from '../todoListSlice'
import { addListItem, todoListReducer, initialState, deleteListItem, editListItem, setIsEditingListItem } from '../todoListSlice'
import { todoApi } from '../todoService'

describe('todoListSlice', () => {
  // let store: ReturnType<typeof configureStore>

  // beforeEach(() => {
  //   store = configureStore({
  //     reducer: {
  //       todoList: todoListReducer,
  //     },
  //   })
  // })

  it('addListItem', () => {
    // const newItem: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
    // store.dispatch(addListItem(newItem))
    // const state = (store.getState() as { todoList: { listItems: ListItemType[] } }).todoList

    const newItem: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
    const newState = todoListReducer(initialState, addListItem(newItem))
    expect(newState.listItems).toHaveLength(1)
    expect(newState.listItems[0]).toEqual(newItem)
  })

  it('deleteListItem', () => {
    const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
    const state = {
      ...initialState,
      listItems: [item],
    }
    const newState = todoListReducer(state, deleteListItem('1'))
    expect(newState.listItems).toHaveLength(0)
    expect(newState.listItems[0]).toBe(undefined)
  })

  it('editListItem', () => {
    const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
    const state = {
      ...initialState,
      listItems: [item],
    }
    const editListItemData: EditListItemData = { id: '1', text: 'Edited item', isChecked: true }
    const newState = todoListReducer(state, editListItem(editListItemData))
    expect(newState.listItems).toHaveLength(1)
    expect(newState.listItems[0]).toEqual({ ...item, text: 'Edited item', isChecked: true })
  })

  it('setIsEditingListItem', () => {
    const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
    const state = {
      ...initialState,
      listItems: [item],
    }
    const newState = todoListReducer(state, setIsEditingListItem({ id: '1', isEditing: true }))
    expect(newState.listItems).toHaveLength(1)
    expect(newState.listItems[0].isEditing).toBe(true)
  })

  describe('todoListSlice', () => {
    it('addListItem', () => {
      const newItem: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
      const newState = todoListReducer(initialState, addListItem(newItem))
      expect(newState.listItems).toHaveLength(1)
      expect(newState.listItems[0]).toEqual(newItem)
    })

    it('deleteListItem', () => {
      const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
      const state = {
        ...initialState,
        listItems: [item],
      }
      const newState = todoListReducer(state, deleteListItem('1'))
      expect(newState.listItems).toHaveLength(0)
      expect(newState.listItems[0]).toBe(undefined)
    })

    it('editListItem', () => {
      const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
      const state = {
        ...initialState,
        listItems: [item],
      }
      const editListItemData: EditListItemData = { id: '1', text: 'Edited item', isChecked: true }
      const newState = todoListReducer(state, editListItem(editListItemData))
      expect(newState.listItems).toHaveLength(1)
      expect(newState.listItems[0]).toEqual({ ...item, text: 'Edited item', isChecked: true })
    })

    it('setIsEditingListItem', () => {
      const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
      const state = {
        ...initialState,
        listItems: [item],
      }
      const newState = todoListReducer(state, setIsEditingListItem({ id: '1', isEditing: true }))
      expect(newState.listItems[0].isEditing).toBe(true)
    })

    // it('handles getTodoById fulfilled action', () => {
    //   const item: ListItemType = { id: '1', text: 'Test item', isChecked: false, isEditing: false }
    //   console.log(12345, `${todoApi.reducerPath}/getTodoById/fulfilled`)

    //   const action = { type: `${todoApi.reducerPath}/getTodoById/fulfilled`, payload: item }
    //   const newState = todoListReducer(initialState, action)
    //   expect(newState.listItems).toHaveLength(1)
    //   expect(newState.listItems[0]).toEqual(item)
    // })
  })
})
