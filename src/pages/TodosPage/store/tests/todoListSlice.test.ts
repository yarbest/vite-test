import { EditListItemData, ListItemType } from '../../types'
import {
  addListItem,
  deleteListItem,
  editListItem,
  initialState,
  setIsEditingListItem,
  todoListReducer,
} from '../todoListSlice'

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
  })
})
