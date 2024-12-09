export interface ListItemType {
  text: string
  isChecked: boolean
  id: string
  isEditing?: boolean
}

export type EditListItemData = Pick<ListItemType, 'id'> & {
  text?: string
  isCheckChanged?: boolean
}