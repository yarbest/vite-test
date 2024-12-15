export interface ListItemType {
  text: string
  isChecked: boolean
  id: string
  isEditing?: boolean
}

export interface TodoFromAPI {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type EditListItemData = Pick<ListItemType, 'id'> & {
  text?: string
  isCheckChanged?: boolean
}

export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
